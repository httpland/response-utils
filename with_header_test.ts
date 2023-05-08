// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { withHeader } from "./with_header.ts";
import { assert, assertEquals, describe, it } from "./_dev_deps.ts";

describe("withHeader", () => {
  const FIELD_NAME = "x-x";
  const FIELD_VALUE = "test";
  const BODY = "ok";
  const INIT_HEADER = "x-init";
  const INIT_HEADER_VALUE = "init";

  it("should return new response instance with specified header", async () => {
    const STATUS = 201;
    const STATUS_TEXT = "status text";

    const initResponse = new Response(BODY, {
      status: STATUS,
      statusText: STATUS_TEXT,
      headers: {
        [INIT_HEADER]: INIT_HEADER_VALUE,
      },
    });

    const response = withHeader(initResponse, FIELD_NAME, FIELD_VALUE);

    assert(response !== initResponse);
    assertEquals(response.headers.get(FIELD_NAME), FIELD_VALUE);
    assertEquals(response.headers.get(INIT_HEADER), INIT_HEADER_VALUE);
    assertEquals(response.status, STATUS);
    assertEquals(response.statusText, STATUS_TEXT);
    assertEquals(await response.text(), BODY);

    assert(!initResponse.headers.has(FIELD_NAME));
    assert(initResponse.headers.has(INIT_HEADER));
  });
});
