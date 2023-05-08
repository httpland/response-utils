// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { equalsHeaders, isNull } from "./deps.ts";

/** Check two `Response` fields equality.
 *
 * @example
 * ```ts
 * import { equalsResponse } from "https://deno.land/x/response_utils@$VERSION/equal.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(
 *   equalsResponse(
 *     new Response(null, { status: 204, headers: { "content-length": "0" } }),
 *     new Response(null, { status: 204, headers: { "content-length": "0" } }),
 *   ),
 * );
 * ```
 */
export function equalsResponse(left: Response, right: Response): boolean;
/** Strict check two `Response` fields equality.
 *
 * @example
 * ```ts
 * import { equalsResponse } from "https://deno.land/x/response_utils@$VERSION/equal.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(
 *   await equalsResponse(
 *     new Response("test1", { status: 200, headers: { "content-length": "5" } }),
 *     new Response("test2", { status: 200, headers: { "content-length": "5" } }),
 *     false,
 *   ),
 * );
 * ```
 *
 * @throws {Error} In strict mode, if response body has already been read.
 */
export function equalsResponse(
  left: Response,
  right: Response,
  strict: boolean,
): boolean | Promise<boolean>;
export function equalsResponse(
  left: Response,
  right: Response,
  strict?: boolean,
): boolean | Promise<boolean> {
  strict ??= false;

  const staticResult = left.ok === right.ok &&
    left.bodyUsed === right.bodyUsed &&
    left.redirected === right.redirected &&
    left.status === right.status &&
    left.statusText === right.statusText &&
    left.type === right.type &&
    left.url === right.url &&
    equalsBodyType(left.body, right.body) &&
    equalsHeaders(left.headers, right.headers);

  if (!staticResult || !strict) return staticResult;

  if (left.bodyUsed || right.bodyUsed) {
    throw Error(
      "response body has already been read and the body cannot be strictly compared",
    );
  }

  return Promise.all([left.clone().text(), right.clone().text()]).then((
    [left, right],
  ) => Object.is(left, right));
}

function equalsBodyType(
  left: Response["body"],
  right: Response["body"],
): boolean {
  if (isNull(left)) {
    return isNull(right);
  }

  if (isNull(right)) {
    return isNull(left);
  }

  return true;
}
