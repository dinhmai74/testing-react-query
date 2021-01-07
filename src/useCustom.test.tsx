/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks";
import * as React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { useCustomHook } from "./useCustomHook";
import nock from "nock";

test("should render hook", async () => {
  const queryCache = new QueryCache();
  const wrapper = ({ children }: any) => (
    <ReactQueryCacheProvider queryCache={queryCache}>
      {children}
    </ReactQueryCacheProvider>
  );

  const expectation = nock("https://fakestoreapi.com")
    .get("/products/1")
    .reply(200, "hello world", { "Access-Control-Allow-Origin": "*" });

  const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });

  await waitFor(() => {
    // @ts-ignore
    return result.current.isSuccess;
  });

  expect(result.current).toEqual("hello world");
});
