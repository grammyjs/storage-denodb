import { assertEquals } from "../test_deps.ts";
import { ComplexSession, SimpleSession, sqliteAdapter } from "./util.ts";

Deno.test("simple object", async function () {
  const adapter = await sqliteAdapter<SimpleSession>();

  await adapter.write("123", { count: 2 });
  assertEquals(await adapter.read("123"), { count: 2 });
});

Deno.test("primitive", async function () {
  const adapterNumber = await sqliteAdapter<number>();

  await adapterNumber.write("123", 2);
  assertEquals(await adapterNumber.read("123"), 2);

  const adapterString = await sqliteAdapter<string>();

  await adapterString.write("123", "test");
  assertEquals(await adapterString.read("123"), "test");
});

Deno.test("complex object", async function () {
  const adapter = await sqliteAdapter<ComplexSession>();

  const example = {
    num: 42,
    str: "grammY",
    nullable: null,
    arr: [1, 2, 3],
    obj: { count: 3 },
  };

  await adapter.write("123", example);
  assertEquals(await adapter.read("123"), example);
});

Deno.test("falsy primitive", async function () {
  const adapterNumber = await sqliteAdapter<number>();

  await adapterNumber.write("123", 0);
  assertEquals(await adapterNumber.read("123"), 0);
  await adapterNumber.write("123", 1);
  assertEquals(await adapterNumber.read("123"), 1);

  const adapterBool = await sqliteAdapter<boolean>();

  await adapterBool.write("123", false);
  assertEquals(await adapterBool.read("123"), false);
  await adapterBool.delete("123");
  assertEquals(await adapterBool.read("123"), null);
});
