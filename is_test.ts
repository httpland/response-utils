// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { isResponse } from "./is.ts";
import { assert, assertFalse, describe, it } from "./_dev_deps.ts";

describe("isResponse", () => {
  it("should return true", () => {
    const table: unknown[] = [
      new Response(),
      new Response(""),
    ];

    table.forEach((value) => {
      assert(isResponse(value));
    });
  });

  it("should return false", () => {
    const table: unknown[] = [
      {},
      null,
      undefined,
      0,
      NaN,
      new Request("http://localhost"),
      "",
      false,
      true,
      [],
    ];

    table.forEach((value) => {
      assertFalse(isResponse(value));
    });
  });
});
