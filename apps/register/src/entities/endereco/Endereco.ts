import { InvalidEnderecoError } from "../errors/InvalidEndereco";
import { type Either, success, failure } from "../../utils/Either";
import type { EnderecoDados } from "./EnderecoDados";
import type { EnderecoProps} from "./EnderecoProps";
import { Cep } from "./Cep";
import { Logradouro } from "./Logradouro";
import { Numero } from "./Numero";
import { Complemento } from "./Complemento";

// Validation
import { Validation } from "../../utils/Validation";


export class Endereco { 
    private _id: string;
    private props: EnderecoProps;
    private _criadoEm: Date;
    private _atualizadoEm: Date;
    private _deletadoEm: Date | undefined;


    constructor (props: EnderecoProps, id: string) {
        this._id = id;
        this.props = props;
        this._criadoEm = new Date();
        this._atualizadoEm = this._criadoEm;
    }
    
    public static async create ({cep, logradouro, numero, complemento}: EnderecoDados, id: string): Promise<Either<Error[], Endereco>> {

        const validations: Record<string, Either<Error, any>> = {
            cep: Cep.create(cep),
            logradouro: Logradouro.create(logradouro),
            numero: Numero.create(Number(numero)),
            complemento: Complemento.create(complemento),
        } 

        const resultValidation: Either<Error[], any> = Validation.combine(validations);

        return success(new Endereco(resultValidation.value, id));
    }

    public get id (): string  {
        return this._id;
    }

    public get cep (): Cep {
        return this.props.cep;
    }

    public get logradouro (): Logradouro {
        return this.props.logradouro;
    }

    public get numero (): Numero {
        return this.props.numero;
    }

    public get complemento (): Complemento {
        return this.props.complemento;
    }
    
}