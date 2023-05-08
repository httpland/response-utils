// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { createResponse } from "./create.ts";
import { equalsResponse } from "./equal.ts";
import { assert, assertEquals, describe, it } from "./_dev_deps.ts";

describe("createResponse", () => {
  it("should return new response", async () => {
    const init = new Response();
    const response = createResponse(init);

    assert(init !== response);
    assert(await equalsResponse(init, response, true));
  });

  it("should return partial updated response", () => {
    const init = new Response(null, { status: 201 });
    const response = createResponse(init, { status: 202 });

    assertEquals(response.status, 202);
  });

  it("should extern body", async () => {
    const response = createResponse(new Response("test"), { status: 202 });

    assert(
      await equalsResponse(
        response,
        new Response("test", { status: 202 }),
        true,
      ),
    );
  });

  it("should not merge headers", async () => {
    const response = createResponse(
      new Response(null, { headers: { "x-test": "test" } }),
      { headers: { "x-test2": "test2" } },
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, { headers: { "x-test2": "test2" } }),
        true,
      ),
    );
  });
});
