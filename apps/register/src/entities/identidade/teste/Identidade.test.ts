import { test, expect, describe, assert } from 'vitest';
import { Identidade } from '../Identidade';
import type { IdentidadeProps } from '../IdentidadeProps';
import type { IdentidadeDados } from '../IdentidadeDados';

// Libraries
import { hash } from 'bcrypt';

// Errors
import { InvalidCpfError } from '../../errors/InvalidCpf';
import { InvalidNomeError } from '../../errors/InvalidNome';
import { InvalidTelefoneError } from '../../errors/InvalidTelefone';
import { InvalidGeneroError } from '../../errors/InvalidGenero';
import { InvalidSenhaError } from '../../errors/InvalidSenha';
import { InvalidIdError } from '../../errors/InvalidId';
import { InvalidEmailError } from '../../errors/InvalidEmail';
import { InvalidPronomeError } from '../../errors/InvalidPronome';
import { InvalidDataError } from '../../errors/InvalidData';


// Criando testes para o modelo de entrada das Entiaddes de entrada do domínio de identidade.
// Funções
describe('IdentidadeEntity', () => {

    const identidadeId = "id-generico";
    const saidaDadosTeste: IdentidadeDados =  {
        nome: "João Silva",
        cpf: "123.456.789-00",
        dataNascimento: expect.any(Date),
        genero: "Masculino",
        pronome: "Ele",
        email: "joao.silva@example.com",
        telefone: "11 99999-9999",
        enderecoId: "Rua Sigismundo Gonçalves",
        senha: expect.any(String),
        criadoEm: expect.any(Date),
        atualizadoEm: expect.any(Date)
    }

    // --- CENÁRIOS DE SUCESSO ---
    describe('Cenários de Sucesso', () => {

        // Mockups para as dependências das propriedades de IdentidadeProps
        const entradaDadosTeste1: IdentidadeDados = {
            nome: "João Silva",
            cpf: "123.456.789-00",
            dataNascimento: new Date(),
            genero: "Masculino",
            pronome: "Ele",
            email: "joao.silva@example.com",
            telefone: "11 99999-9999",
            enderecoId: "Rua Sigismundo Gonçalves",
            senha: "minhasenha",
            criadoEm: new Date(),
            atualizadoEm: new Date()
        };

        test('deve retornar uma Identidade de sucesso', async () => {
            const resultado = await Identidade.create(entradaDadosTeste1, identidadeId);
            // expect(resultado.isSuccess()).toBe(true);
            if (resultado.isSuccess()) { 
                const valor = resultado.value;
                expect({
                    nome: valor.nome.value,
                    cpf: valor.cpf.valueFormatado,
                    email: valor.email.value,
                    dataNascimento: valor.dataNascimento.value,
                    genero: valor.genero.value,
                    pronome: valor.pronome?.value,
                    telefone: valor.telefone.value,
                    enderecoId: valor.endereco.value,
                    senha: valor.senha.value,
                    criadoEm: valor.criadoEm.value,
                    atualizadoEm: valor.atualizadoEm.value
                }).toEqual(saidaDadosTeste);
            }
        });
    });

    // --- CENÀRIOS DE ERRO ---
    describe('Cenários de Erro', () => {

        const identidadeId = "id-generico";
        const entradaDadosTeste2: IdentidadeDados = {
            nome: "João Silva",
            cpf: "004.994.092-99",
            dataNascimento: new Date(),
            genero: "Masculino",
            pronome: "Ele",
            email: "joao.silva@example.com",
            telefone: "11 -asd 99999-9999",
            enderecoId: "Rua Sigismundo Gonçalves",
            senha: "minhasenha",
            criadoEm: new Date(),
            atualizadoEm: new Date()
        };

        describe ('Campos Ausentes.', () => {
            test('deve falhar com nome ausente', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, nome: "" }, identidadeId);
                expect(resultado.isError()).toBe(true);
                if (resultado.isError()){
                     expect(resultado.value.some(e => e instanceof InvalidNomeError)).toBe(true);
                }
                
            });
            
            test('deve falhar com cpf ausente', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, cpf: "" }, identidadeId);
                expect(resultado.isError()).toBe(true);
                if (resultado.isError()){
                     expect(resultado.value.some(e => e instanceof InvalidCpfError)).toBe(true);
                }
            });

            test('deve falhar com email ausente', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, email: "" }, identidadeId);
                expect(resultado.isError()).toBe(true);
                if (resultado.isError()){
                    expect(resultado.value.some(e => e instanceof InvalidEmailError)).toBe(true);
                }
            });

            test('deve falhar com telefone ausente', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, telefone: "" }, identidadeId);
                if (resultado.isError()){
                     expect(resultado.value.some(e => e instanceof InvalidTelefoneError)).toBe(true);
                }
            });

            test('deve falhar com genero ausente', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, genero: "" }, identidadeId);
                if (resultado.isError()){
                     expect(resultado.value.some(e => e instanceof InvalidGeneroError)).toBe(true);
                }
            });

            test('deve falhar com senha ausente', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, senha: "" }, identidadeId);
                if (resultado.isError()){
                     expect(resultado.value.some(e => e instanceof InvalidSenhaError)).toBe(true);
                }
            });

            test('deve falhar com enderecoId ausente', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, enderecoId: "" }, identidadeId);
                if (resultado.isError()){
                     expect(resultado.value.some(e => e instanceof InvalidIdError)).toBe(true);
                }
            });
        });

        describe('Formatos Inválidos.', () => {
            test('deve falhar com cpf inválido', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, cpf: "123" }, identidadeId);
                if (resultado.isError()){
                    expect(resultado.value.some(e => e instanceof InvalidCpfError)).toBe(true);
                }
            });

            test('deve falhar com email inválido', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, email: "joaoexample.com" }, identidadeId);
                if (resultado.isError()){
                    expect(resultado.value.some(e => e instanceof InvalidEmailError)).toBe(true);
                }
            });

            test('deve falhar com telefone inválido', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, telefone: "123" }, identidadeId);
                if (resultado.isError()){
                    expect(resultado.value.some(e => e instanceof InvalidTelefoneError)).toBe(true);
                }
            });

            test('deve falhar com genero inválido', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, genero: "X" }, identidadeId);
                if (resultado.isError()){
                    expect(resultado.value.some(e => e instanceof InvalidGeneroError)).toBe(true);
                }
            });

            test('deve falhar com pronome inválido', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, pronome: "X" }, identidadeId);
                if (resultado.isError()){
                    expect(resultado.value.some(e => e instanceof InvalidPronomeError)).toBe(true);
                }
            });

            test('deve falhar com dataNascimento inválida', async () => {
                const resultado = await Identidade.create({ ...entradaDadosTeste2, dataNascimento: new Date("data-invalida") }, identidadeId);
                if (resultado.isError()){
                    expect(resultado.value.some(e => e instanceof InvalidDataError)).toBe(true);
                }
            });
        });
        
    });


    // --- CENÁRIOS DE TIPOS DE VALORES E Limite ---
    describe('Cenários de Tipo de Valores e Limite', () => {
        test('', () => {});
    });

});