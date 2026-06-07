import { Id } from "./Id";
import { Nome } from "./Nome";
import { Cpf } from "./Cpf";
import { Data } from "./Data";
import { Email } from "./Email";
import { Genero } from "./Genero";
import { Pronome } from "./Pronome";
import { Telefone } from "./Telefone";
import { Senha } from "./Senha";


// Types of Identidade attributes
import type { IdentidadeProps } from "./IdentidadeProps";
// Types of user data
import type { IdentidadeDados } from "./IdentidadeDados";

import {type Either, failure, success } from "../../utils/Either";

// Validation
import { Validation } from "../../utils/Validation";

// Errors
import { InvalidPronomeError } from "../errors/InvalidPronome";

// Libraries
import { hash } from "bcrypt";
import type { InvalidDataError } from "../errors/InvalidData";


// Modelo de Identidade
export class Identidade {
    private _id: string;
    private props: IdentidadeProps;
    private _criadoEm: Data;
    private _atualizadoEm: Data;
    private _deletadoEm: Data | undefined;

    constructor(
        props: IdentidadeProps, 
        id: string, 
        criadoEm: Data, 
        atualizadoEm: Data,
        deletadoEm?: Data
    ) {
        this._id = id;
        this.props = props;
        this._criadoEm = criadoEm;
        this._atualizadoEm = atualizadoEm;
        this._deletadoEm = deletadoEm;
    }

    // Getters for the properties
    public get id() : string {
        return this._id;
    }

    public get nome() : Nome {
        return this.props.nome;
    }

    public get cpf() : Cpf {
        return this.props.cpf;
    }

    public get dataNascimento() : Data {
        return this.props.dataNascimento;
    }

    public get genero() : Genero {
        return this.props.genero;
    }

    public get pronome() : Pronome | undefined{
        return this.props.pronome;
    }

    public get email() : Email  {
        return this.props.email;
    }

    public get telefone() : Telefone {
        return this.props.telefone;
    }

    public get senha() : Senha {
        return this.props.senha;
    }

    public get endereco() : Id {
        return this.props.enderecoId;
    }

    public get criadoEm(): Data {
        return this._criadoEm;
    }

    public get atualizadoEm(): Data {
        return this._criadoEm;
    }

    // Método de fábrica para criar uma nova instância de IdentidadeEntity
    public static async create (
        {nome, cpf, dataNascimento, genero, pronome, email, telefone, enderecoId, senha}: IdentidadeDados,
         id: string
        ): Promise<Either<Error[], Identidade>> {
        
        // Validação por fp-ts
        const identidadeProps: Record<string, Either<Error, any>> = {
            nome: Nome.create(nome),
            cpf: Cpf.create(cpf),
            dataNascimento: Data.create(dataNascimento),
            genero: Genero.create(genero),
            pronome: pronome ? Pronome.create(pronome) : success<InvalidPronomeError, undefined>(undefined),
            email: Email.create(email),
            telefone: Telefone.create(telefone),
            enderecoId: Id.reconstitute(enderecoId), // Id de uma entidade de Endereço atribuída a Identidade/User
            senha: Senha.create(await hash (senha, 10)),
        }

        const resultProps: Either<Error[], any> =  Validation.combine(identidadeProps);

        // Retorno de erros
        if (resultProps.isError()){
            return failure(resultProps.value);
        }

        // Atribuindo uma nova data
        const agora: Date = new Date();
        const criadoEm: Either<InvalidDataError, Data> = Data.create(agora);
        const atualizadoEm: Either<InvalidDataError, Data> = Data.create(agora);

        if (criadoEm.isError()){
            return failure([criadoEm.value])
        }
        if (atualizadoEm.isError()){
            return failure([atualizadoEm.value]);
        }

        return success(new Identidade(resultProps.value, id, criadoEm.value, atualizadoEm.value));
    }   

    public static reconstitute () {}
}