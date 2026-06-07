import { InvalidGeneroError } from "../errors/InvalidGenero"
import { type Either, success, failure} from "../../utils/Either"
import { GeneroEnum } from "./enums/GeneroEnum";
export class Genero {
    private readonly _genero: string;
    constructor (genero: string){
        this._genero = genero;
    }
    
    public static create (genero:string): Either<InvalidGeneroError, Genero> {
        return success(new Genero(genero));
    }

    public static validation (genero: string): boolean {
        
        console.log(genero);    
        if (!(genero in GeneroEnum)) return false;
        return true;

    }

    public static NoFieldGeneroError (genero: string): boolean {
        if (genero.length > 0) return false;
        return true;
    }

    public get value(): string {
        return this._genero;
    }
}