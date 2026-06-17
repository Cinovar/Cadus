import { IdentidadeId } from "./IdentidadeId";
import { EnderecoId } from "../endereco/EnderecoId";
import { Nome } from "./Nome";
import { Cpf } from "./Cpf";
import { Data } from "../../../shared/value-objects/Data";
import { Email } from "./Email";
import { Genero } from "./Genero";
import { Pronome } from "./Pronome";
import { Telefone } from "./Telefone";
import { Senha } from "./Senha";

// Types of Identidade attributes
import type { IdentidadeProps } from "./IdentidadeProps";
// Types of user data
import type { IdentidadeDados } from "./IdentidadeDados";

import {type Either, failure, success } from "../../../shared/Either";

// Validation
import { Validation } from "../../../shared/Validation";

// Errors
import { InvalidPronomeError } from "../../errors/InvalidPronome";

// Modelo de Identidade
export class Identidade {
    private _id: IdentidadeId;
    private props: IdentidadeProps;
    private _criadoEm: Data;
    private _atualizadoEm: Data;
    private _deletadoEm: Data | undefined;

    constructor(
        props: IdentidadeProps, 
        IdentidadeId: IdentidadeId, 
        criadoEm: Data, 
        atualizadoEm: Data,
        deletadoEm?: Data
    ) {
        this._id = IdentidadeId;
        this.props = props;
        this._criadoEm = criadoEm;
        this._atualizadoEm = atualizadoEm;
        this._deletadoEm = deletadoEm;
    }

    
    // Método de fábrica para criar uma nova instância de IdentidadeEntity
    public static create (
        {nome, cpf, dataNascimento, genero, pronome, email, telefone, enderecoId, senhaHash}: IdentidadeDados,
         IdentidadeId: IdentidadeId
        ): Either<Error[], Identidade> {
        
        // Validação por fp-ts
        const identidadeProps: Record<string, Either<Error, any>> = {
            nome: Nome.create(nome),
            cpf: Cpf.create(cpf),
            dataNascimento: Data.create(dataNascimento),
            genero: Genero.create(genero),
            pronome: pronome ? Pronome.create(pronome) : success<InvalidPronomeError, undefined>(undefined),
            email: Email.create(email),
            telefone: Telefone.create(telefone),
            enderecoId: EnderecoId.reconstitute(enderecoId), // IdentidadeId de uma entidade de Endereço atribuída a Identidade/User
            senha: Senha.create(senhaHash),
            criadoEm: Data.create(new Date()),
            atualizadoEm: Data.create(new Date())
        }

        const resultProps: Either<Error[], any> =  Validation.combine(identidadeProps);
        

        // Retorno de erros
        if (resultProps.isError()){
            return failure(resultProps.value);
        }
        
        const { criadoEm, atualizadoEm, ...props } = resultProps.value;
        
        return success(new Identidade(props, IdentidadeId, criadoEm, atualizadoEm));
    }   

    public static reconstitute (
        props: IdentidadeProps,
        IdentidadeId: IdentidadeId,
        criadoEm: Data,
        atualizadoEm: Data,
        deletadoEm?: Data | undefined
    ): Identidade {
        return new Identidade(props, IdentidadeId, criadoEm, atualizadoEm, deletadoEm);
    }

    // Getters for the class members
    public get IdentidadeId() : IdentidadeId {
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

    public get endereco() : EnderecoId {
        return this.props.enderecoId;
    }

    public get criadoEm(): Data {
        return this._criadoEm;
    }

    public get atualizadoEm(): Data {
        return this._criadoEm;
    }
}