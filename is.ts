// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Whether the input is `Response` or not.
 *
 * @example
 * ```ts
 * import { isResponse } from "https://deno.land/x/response_utils@$VERSION/is.ts";
 * import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isResponse(new Response()));
 * assertFalse(isResponse({}));
 * assertFalse(isResponse(null));
 * ```
 */
export function isResponse(input: unknown): input is Response {
  return input instanceof Response;
}
