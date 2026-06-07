import { InvalidIdError } from "../errors/InvalidId";
import { type Either, success, failure } from "../../utils/Either";

export class Id {
    private readonly _id: string;
    constructor (id: string) {
        this._id = id;
        Object.freeze(this);
    }
    
    public static create (id: string): Either<InvalidIdError, Id>{
        return success(new Id(id));
    }

    public static reconstitute (id: string): Either<InvalidIdError, Id> {
        return success(new Id(id));
    }
    
    public get value (): string {
        return this._id;
    }

}