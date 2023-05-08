import {
  BuildOptions,
  EntryPoint,
} from "https://deno.land/x/dnt@0.34.0/mod.ts";
import { expandGlobSync } from "https://deno.land/std@0.185.0/fs/expand_glob.ts";
import {
  fromFileUrl,
  join,
  parse,
  relative,
} from "https://deno.land/std@0.185.0/path/mod.ts";

interface ModuleInfo {
  readonly name: string;
  readonly path: string;
}

function path2EntryPoint(module: ModuleInfo): EntryPoint {
  const entryPoint: EntryPoint = {
    name: toRelative(module.name),
    path: toRelative(module.path),
  };

  return entryPoint;
}

function module2TypeVersions(modules: readonly ModuleInfo[]) {
  const entries = modules.map(({ name, path }) => {
    return [name, [join("types", toDts(path))]];
  });
  const map = Object.fromEntries(entries);

  return { "*": map };
}

function toRelative(path: string): string {
  return path.startsWith("./") ? path : "./" + path;
}

function toDts(path: string): string {
  return path.replace(/.ts$/, ".d.ts");
}

const root = fromFileUrl(import.meta.resolve("../"));
const entries = expandGlobSync("!(_*|*_test.ts)*.ts", {
  includeDirs: false,
  root,
});

const modules = [...entries].map(({ path }) => relative(root, path)).map(
  (path) => {
    const parsed = parse(path);
    const name = join(parsed.dir, parsed.name) + ".js";

    return { name, path };
  },
);

const entryPoints = modules.map(path2EntryPoint);
const typesVersions = module2TypeVersions(modules);

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["esnext", "dom", "dom.iterable"],
  },
  typeCheck: true,
  entryPoints,
  outDir: "./npm",
  package: {
    name: "@httpland/response-utils",
    version,
    description: "Response utility collection",
    keywords: [
      "http",
      "response",
      "fetch-api",
      "utility",
      "utilities",
      "collection",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/response-utils",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/response-utils.git",
    },
    bugs: {
      url: "https://github.com/httpland/response-utils/issues",
    },
    main: undefined,
    module: undefined,
    types: undefined,
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
    typesVersions,
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/headers_utils@1.0.0/equal.ts": {
      name: "@httpland/headers-utils",
      version: "1.0.0",
      subPath: "equal.js",
    },
    "https://deno.land/x/isx@1.3.1/is_null.ts": {
      name: "@miyauci/isx",
      version: "1.3.1",
      subPath: "is_null.js",
    },
  },
});
