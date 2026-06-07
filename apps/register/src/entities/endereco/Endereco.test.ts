import { describe, expect, test } from "vitest";
import { Endereco } from "./Endereco";
import type { EnderecoDados } from "./EnderecoDados";
import { Validation } from "../../utils/Validation";
import { Logradouro } from "./Logradouro";


const enderecoId = "id-generico";

describe("EnderecoEntity", () => {
    // --- CENÁRIOS DE SUCESSO ---
    describe("CENÁRIOS DE SUCESSO", () => {
        test('', async () => {
            const input: EnderecoDados = {
                cep: " ",
                logradouro: " ",
                numero: 0,
                complemento: " ",
            }

            const resultado = await Endereco.create(input, enderecoId);

            expect(resultado.isError()).toBe(false);
        });
    });
    // --- CENÁRIOS DE ERRO ---


    // --- CENÁRIOS DE SUCESSO ---
});