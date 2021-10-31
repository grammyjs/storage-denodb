import { StorageAdapter, Connector } from "../deps.ts";

export class DenoDBAdapter<T> implements StorageAdapter<T> {
  constructor(connector: Connector) {
  }
  read(key: string) {
    return null as unknown as T;
  }
  write(key: string, value: T) {}
  delete(key: string) {}
}
