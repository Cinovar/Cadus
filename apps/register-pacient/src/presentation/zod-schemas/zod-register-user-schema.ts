// Domain
import { type UserData } from "../../domain/entities/user/user-data";
// Validation
import { z } from "zod";

export const registerUserSchema : z.ZodType<UserData> = z.object({
    name: z.string(),
    cpf: z.string(),
    birthDate: z.date(),
    gender: z.string(),
    pronoun: z.string().optional(),
    email: z.email(),
    telephone: z.string(),
    password: z.string()
});