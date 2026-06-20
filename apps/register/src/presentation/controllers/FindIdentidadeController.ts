import type { HttpRequest, HttpResponse } from "../protocol-interfaces/Http";
import type { BaseController } from "./BaseController";
import { serverError } from "./helpers/HttpHelper";

/**
 * FindIdentidadeController
 * 
 * - Valida dados da requisição HTTP
 * - Mapea dados HTTP para IdentidadeDados (DTO)
 * - Invoca o use case de registro
 * - Trata respostas e erros
 * 
 */
export class FindIdentidadeController implements BaseController {
    handle(req: HttpRequest): Promise<HttpResponse> {
        try {


        }
        catch (error) {
            const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";
            return serverError(errorMessage);
        }
    }
}