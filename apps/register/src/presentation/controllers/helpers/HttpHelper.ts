// Helpers com as respostas mais eeperadas pelo sistema
import type { HttpResponse } from "../../protocol-interfaces/Http";
import { ServerError } from "../errors/ServerError";

// Responses 2XX
export const ok = (data: any) : HttpResponse => {
    return {
        statusCode: 200,
        body: data
    }
}

export const noContent = () : HttpResponse => {
    return {
        statusCode: 204,
        body: null
    }
}

// Responses 4XX
export const badRequest = (error: Error) : HttpResponse => {
    return {
        statusCode: 400,
        body: error.message
    }
}

export const forbidden = (error: Error) : HttpResponse => {
    return {
        statusCode: 403,
        body: error
    }
}

// Responses 5XX
export const serverError = (reason: string) : HttpResponse => {
    return {
        statusCode: 500,
        body: new ServerError (reason)
    }
}