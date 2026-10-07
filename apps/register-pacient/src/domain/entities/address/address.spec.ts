// Estruturas de teste
import { describe, test, expect } from "vitest";
import { Address } from "./address";
import type { AddressData } from "./address-data";
import { ZipCode } from "./zip-code";
import type { AddressCreateError, AddressError, AddressReconstituteError } from "./errors/address-errors";
// Shared
import { type Either } from "../../../shared/either";

const VALID = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  otherId: "223e4567-e89b-12d3-a456-426614174001",
  zipCode: "52030-180",
  number: 42,
  publicSpace: "Rua das Flores",
  complement: "Apto 101",
};

const INVALID = {
  id: "nao-e-uuid",
  zipCode: "00000000",
  number: -1,
  emptyString: ""
}

type AddressOverrides = Partial<AddressData>;

// Factories
const makeAddress = (overrides : AddressOverrides = {}, id: string = VALID.id) : Either<AddressCreateError, Address> => {
    return Address.create ({
        zipCode: VALID.zipCode,
        number: VALID.number,
        ...overrides
    },
    id);
}

const makeAddressReconstitute = (deletedAt? : Date) : Address => {
    const createdAt: Date = new Date();
    const updatedAt: Date = new Date();
    return Address.reconstitute(
        VALID.id,
        {
        zipCode: VALID.zipCode,
        publicSpace: VALID.publicSpace,
        number: VALID.number,
        complement: VALID.complement
        },
        createdAt,
        updatedAt,
        deletedAt
    );
}

describe("Domain - Address (Entity)", () => {
  describe("CENARIOS DE SUCESSO", () => {
    test("", () => {
       
    });
  });
  describe("CENARIOS DE ERRO", () => {
    test("", () => {});
  });
  describe("CENARIOS LIMITE", () => {
    test("", () => {});
  });
});
