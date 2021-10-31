import { assertEquals, SQLite3Connector } from "../test_deps.ts";
import { DenoDBAdapter } from "../mod.ts";

interface SimpleSession {
  count: number;
}

Deno.test("can initialize with sqlite memory db", function () {
  let connector = new SQLite3Connector({ filepath: ":memory:" });
  let adapter = new DenoDBAdapter<SimpleSession>(connector);
});

Deno.test("will return null for non-existant key", async function(){
  let connector = new SQLite3Connector({ filepath: ":memory:" });
  let adapter = new DenoDBAdapter<SimpleSession>(connector);

  assertEquals(await adapter.read("123"), null);
})

