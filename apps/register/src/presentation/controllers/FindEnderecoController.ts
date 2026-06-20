import type { HttpRequest, HttpResponse } from "../protocol-interfaces/Http";
import type { BaseController } from "./BaseController";
import { serverError } from "./helpers/HttpHelper";

/**
 * FindEnderecoController
 * 
 * - Valida dados da requisição HTTP
 * - Mapea dados HTTP para IdentidadeDados (DTO)
 * - Invoca o use case de registro
 * - Trata respostas e erros
 * 
 */
export class FindEnderecoController implements BaseController {
    handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            if ()
        }
        catch (error) {
            const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";
            return serverError(errorMessage);
        }
    }
}