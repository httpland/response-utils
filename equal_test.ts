// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { equalsResponse } from "./equal.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

describe("equalsResponse", () => {
  it("should pass cases", () => {
    const table: [Response, Response, boolean][] = [
      [new Response(), new Response(), true],
      [new Response(null), new Response(), true],
      [new Response(undefined), new Response(), true],
      [
        new Response(null, {
          status: 500,
        }),
        new Response(null, {
          status: 500,
        }),
        true,
      ],
      [
        new Response(null, {
          statusText: "",
        }),
        new Response(null, {
          statusText: "",
        }),
        true,
      ],
      [
        new Response(null, {
          headers: {
            a: "",
          },
        }),
        new Response(null, {
          headers: {
            a: "",
          },
        }),
        true,
      ],
      [
        new Response(null, {
          headers: {
            a: "test",
          },
        }),
        new Response(null, {
          headers: {
            a: "",
          },
        }),
        false,
      ],
      [
        new Response(null, {
          statusText: "",
        }),
        new Response(null, {
          statusText: "a",
        }),
        false,
      ],
      [
        new Response(null, {
          status: 200,
        }),
        new Response(null, {
          status: 201,
        }),
        false,
      ],
      [
        new Response(null, {
          status: 300,
        }),
        new Response(),
        false,
      ],
      [new Response("test"), new Response(), false],
      [new Response(""), new Response(""), true],
      [new Response("a"), new Response(""), true],
      [new Response("a"), new Response("a"), true],
    ];

    Promise.all(table.map(([left, right, result]) => {
      assertEquals(equalsResponse(left, right), result);
    }));
  });

  it("should pass if strict mode", async () => {
    const table: [Response, Response, boolean][] = [
      [new Response(""), new Response(""), true],
      [new Response("a"), new Response("a"), true],
      [new Response("test"), new Response(), false],
      [new Response("a"), new Response(""), false],
    ];

    await Promise.all(table.map(async ([left, right, result]) => {
      assertEquals(await equalsResponse(left, right, true), result);
    }));
  });

  it("should throw error if strict mode and the response body has been read", async () => {
    const response = new Response("");
    await response.text();

    assert(response.bodyUsed);
    assertThrows(() => equalsResponse(response, response, true));
  });

  it("should not throw when the response body has used", async () => {
    const res = new Response("");

    await res.text();

    assert(res.bodyUsed);
    assertFalse(equalsResponse(res, new Response("")));
  });

  it("should use cloned response", async () => {
    const res = new Response("");

    assert(equalsResponse(res, new Response("")));
    assertFalse(res.bodyUsed);
    assertEquals(await res.text(), "");
  });
});
