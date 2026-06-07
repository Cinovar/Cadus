import { InvalidDataError } from "../errors/InvalidData"
import { type Either, success, failure} from "../../utils/Either"
export class Data {
    private readonly data: Date;
    constructor(data: Date) {
        this.data = data;
        Object.freeze(this);
    }

    get value (): Date {
        return this.data;
    }

    static create(data: Date): Either<InvalidDataError, Data> {
        return success(new Data(data))
    }
}