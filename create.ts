// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { isResponse } from "./is.ts";

/** Create a new `Response`.
 *
 * If you create a new `Response` from an existing `Response`, any options you set
 * in an options argument for the new response replace any corresponding options
 * set in the original `Response`.
 *
 * @example
 * ```ts
 * import { createResponse } from "https://deno.land/x/response_utils@$VERSION/create.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const init: Response;
 * const response = createResponse(init, { status: 201 });
 *
 * assertEquals(response.status, 201);
 * ```
 */
export function createResponse(
  input: Response | Body,
  init?: ResponseInit,
): Response {
  init = isResponse(input)
    ? {
      headers: input.headers,
      status: input.status,
      statusText: input.statusText,
      ...init,
    }
    : init;

  return new Response(input.body, init);
}
