import { type AddressData } from "../../domain/entities/address/address-data";
import { z } from "zod";

export const registerAddressSchema: z.ZodType<AddressData> = z.object({
  zipCode: z
    .string("Not a string.")
    .regex(/^\d{5}-\d{3}$|^\d{8}$/)
    .transform((v) => v.replace(/\D/g, "")),
  publicSpace: z
    .string("Not a string.")
    .max(200, "Is greather than 200")
    .optional(),
  number: z.number("Not a number.").positive("Not a positive number"),
  complement: z
    .string("Not a string.")
    .max(200, "Is greather than 200")
    .optional(),
});
