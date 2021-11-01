import { Database, StorageAdapter } from "../deps.ts";
import { SessionJson } from "./json_model.ts";

export class DenoDBAdapter<T> implements StorageAdapter<T> {
  constructor(db: Database) {
    db.link([SessionJson]);
  }
  async read(key: string) {
    const session = await SessionJson.find(key);
    return session ? JSON.parse(session.value as string) : null;
  }
  async write(key: string, value: T) {
    const session = await SessionJson.find(key);
    if (session) {
      session.value = JSON.stringify(value);
      await session.update();
    } else {
      await SessionJson.create({
        key,
        value: JSON.stringify(value),
      });
    }
  }
  async delete(key: string) {
    await SessionJson.deleteById(key);
  }
}
