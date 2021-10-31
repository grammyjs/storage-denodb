import { Database } from "../deps.ts";
import { SQLite3Connector } from "../test_deps.ts";
import { DenoDBAdapter } from "../mod.ts";

export interface SimpleSession {
  count: number;
}

export async function sqliteAdapter<T>() {
  const connector = new SQLite3Connector({ filepath: ":memory:" });
  const db = new Database(connector);
  const adapter = new DenoDBAdapter<T>(db);
  await db.sync({ drop: true });
  return adapter;
}
