import { randomUUID } from "node:crypto";

interface IIdGenerator {
  generate: () => string;
}

export class IdGenerator implements IIdGenerator {
  generate(): string {
    return randomUUID() as string;
  }
}
