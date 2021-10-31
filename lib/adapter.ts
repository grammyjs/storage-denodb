import { Database, StorageAdapter } from "../deps.ts";
import { SessionJson } from "./json_model.ts";

export class DenoDBAdapter<T> implements StorageAdapter<T> {
  constructor(db: Database) {
    db.link([SessionJson]);
  }
  async read(key: string) {
    const session = await SessionJson.where("key", key).first();
    return session ? JSON.parse(session.value as string) : null;
  }
  async write(key: string, value: T) {
    await SessionJson.create({
      key,
      value: JSON.stringify(value),
    });
  }
  async delete(key: string) {
    const s = await SessionJson.where("key", key).first();
    if (s) {
      await s.delete();
    }
  }
}
