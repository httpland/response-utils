// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Return an instance with the provided `Response` replacing the specified header.
 * There are no side effects on the original `Response`.
 *
 * @example
 * ```ts
 * import { withHeader } from "https://deno.land/x/response_utils@$VERSION/with_header.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const init: Response;
 * declare const fieldName: string;
 * declare const fieldValue: string;
 *
 * const response = withHeader(init, fieldName, fieldValue);
 *
 * assert(response.headers.get(fieldName), fieldValue);
 * assert(init !== response);
 * ```
 */
export function withHeader(
  response: Response,
  fieldName: string,
  fieldValue: string,
): Response {
  const headers = new Headers([...response.headers.entries(), [
    fieldName,
    fieldValue,
  ]]);
  const { status, statusText } = response;

  return new Response(response.body, { headers, status, statusText });
}
