import { Nome } from "./Name";
import { Cpf } from "./Cpf";
import { DataNascimento } from "./DataNascimento";
import { Email } from "./Email";
import { Genero } from "./Genero";
import { Pronome } from "./Pronome";
import { Telefone } from "./Telefone";
import { Senha } from "./Senha";
import { EnderecoEntity } from "./Endereco";

import type { IdentidadeProps } from "./IdentidadeProps";


import { InvalidCpfError } from "../errors/InvalidCpf";

// Libraries
import crypto from 'crypto';

// Modelo de Identidade
export class Identidade {
    private _id: string;
    private props: IdentidadeProps;

    constructor(props: IdentidadeProps, id?: string) {
        this._id = id ?? crypto.randomUUID();
        this.props = props;
    }

    // Getters for the properties
    get id() : string {
        return this._id;
    }

    get nome() : Nome {
        return this.props.nome;
    }

    get cpf() : Cpf {
        return this.props.cpf;
    }

    get dataNascimento() : DataNascimento {
        return this.props.dataNascimento;
    }

    get genero() : Genero {
        return this.props.genero;
    }

    get pronome() : Pronome | undefined {
        return this.props.pronome;
    }

    get email() : Email | undefined {
        return this.props.email;
    }

    get telefone() : Telefone {
        return this.props.telefone;
    }

    get senha() : Senha {
        return this.props.senha;
    }

    get endereco() : EnderecoEntity {
        return this.props.endereco;
    }

    // Método de fábrica para criar uma nova instância de IdentidadeEntity
    static create(props: IdentidadeProps): <InvalidCpfError, Identidade> {
        return new IdentidadeEntity(props);
    }


}