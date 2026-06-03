import { test, expect, describe, assert } from 'vitest'
import { Identidade } from './Identidade'
import type { IdentidadeProps } from './IdentidadeProps'
import { DataNascimento } from './DataNascimento';
import { Senha } from './Senha';

// Mockups para as dependências das propriedades de IdentidadeProps

const testProps: IdentidadeProps = {
    nome: "João Silva",
    cpf: "123.456.789-00",
    dataNascimento: new DataNascimento(),
    genero: "Masculino",
    pronome: "Ele",
    email: "joao.silva@example.com",
    telefone: "11 99999-9999",
    senha: new Senha(),
    endereco: {
        rua: "Rua Exemplo",
        numero: "123",
        bairro: "Bairro Exemplo",
        cidade: "Cidade Exemplo",
        estado: "Estado Exemplo",
        cep: "12345-678"
    },
    criadoEm: new Date(),
    atualizadoEm: new Date()
};  

// Criando testes para o modelo de entrada das Entiaddes de entrada do domínio de identidade.
// Funções
function criarIdentidade() : Identidade {
    return new Identidade(testProps)
}   

describe('RegisterService', () => {
    describe('IdentidadeEntity', () => {

        describe('constructor()', () => {
            test('Deve criar uma nova instância de IdentidadeEntity', () => {
                const identidade = criarIdentidade();
                expect(identidade).toBeInstanceOf(Identidade);
            });
            test('Deve ter as conter as propriedades básicas', () => {
                const identidade = criarIdentidade();
                const expectedProps: (keyof IdentidadeProps)[] = [
                    'id',
                    'nome',
                    'cpf',
                    'dataNascimento',
                    'genero',
                    'pronome',
                    'email',
                    'telefone',
                    'senha',
                    'endereco',
                    'criadoEm',
                    'atualizadoEm'
                ];

                expectedProps.forEach((prop) => {
                    expect(identidade).toHaveProperty(prop);
                });
            });
        });
    
        describe('create()', () => {
            test('Deve retornar uma instância válida de Identidade', () => {
                assert(Identidade.create(testProps) instanceof Identidade);
            });
        });
        

    });


});