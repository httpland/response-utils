# response-utils

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/response_utils)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/response-utils)](https://github.com/httpland/response-utils/releases)
[![codecov](https://codecov.io/github/httpland/response-utils/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/response-utils)
[![GitHub](https://img.shields.io/github/license/httpland/response-utils)](https://github.com/httpland/response-utils/blob/main/LICENSE)

[![test](https://github.com/httpland/response-utils/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/response-utils/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/response-utils.png?mini=true)](https://nodei.co/npm/@httpland/response-utils/)

Response utility collection.

## createResponse

Create a new `Response`

If you create a new `Response` from an existing `Response`, any options you set
in an options argument for the new response replace any corresponding options
set in the original `Response`.

```ts
import { createResponse } from "https://deno.land/x/response_utils@$VERSION/create.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

declare const init: Response;
const response = createResponse(init, { status: 201 });

assertEquals(response.status, 201);
```

## equalsResponse

Check two `Response` fields equality.

```ts
import { equalsResponse } from "https://deno.land/x/response_utils@$VERSION/equal.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(
  equalsResponse(
    new Response(null, { status: 204, headers: { "content-length": "0" } }),
    new Response(null, { status: 204, headers: { "content-length": "0" } }),
  ),
);
```

If you also want to check the equivalence of the body, set the mode to strict.

```ts
import { equalsResponse } from "https://deno.land/x/response_utils@$VERSION/equal.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(
  await equalsResponse(
    new Response("test1", { status: 200, headers: { "content-length": "5" } }),
    new Response("test2", { status: 200, headers: { "content-length": "5" } }),
    true,
  ),
);
```

### Throwing error

In strict mode, if response body has already been read.

```ts
import { equalsResponse } from "https://deno.land/x/response_utils@$VERSION/equal.ts";
import { assert, assertThrows } from "https://deno.land/std/testing/asserts.ts";

const response = new Response("");
await response.text();

assert(response.bodyUsed);
assertThrows(() => equalsResponse(response, response, true));
```

## isResponse

Whether the input is `Response` or not.

```ts
import { isResponse } from "https://deno.land/x/response_utils@$VERSION/is.ts";
import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";

assert(isResponse(new Response()));
assertFalse(isResponse({}));
assertFalse(isResponse(null));
```

## API

All APIs can be found in the [deno doc](https://deno.land/x/response_utils?doc).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
