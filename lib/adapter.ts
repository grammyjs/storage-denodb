import { Database, StorageAdapter } from "../deps.ts";
import { SessionJson } from "./json_model.ts";

export class DenoDBAdapter<T> implements StorageAdapter<T> {
  constructor(db: Database) {
    db.link([SessionJson]);
  }
  async read(key: string) {
    const session = await SessionJson.where("key", key).first();
    return session ? JSON.parse(session.value) : null;
  }
  async write(key: string, value: T) {
    await SessionJson.create({
      key,
      value: JSON.stringify(value),
    });
  }
  delete(key: string) {}
}
