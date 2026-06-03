import type { Error } from "./DomainError";

export class InvalidCpfError extends Error {
    constructor(){
        super()
    }
}