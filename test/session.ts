import { assertEquals } from "../test_deps.ts";
import { SimpleSession, sqliteAdapter } from "./util.ts";

Deno.test("can initialize with sqlite memory db", async function () {
  await sqliteAdapter();
});

Deno.test("will return null for non-existant key", async function () {
  const adapter = await sqliteAdapter<SimpleSession>();

  assertEquals(await adapter.read("123"), null);
});

Deno.test("can save a key", async function () {
  const adapter = await sqliteAdapter<SimpleSession>();

  assertEquals(await adapter.read("123"), null);
  await adapter.write("123", { count: 2 });
  assertEquals(await adapter.read("123"), { count: 2 });
});
