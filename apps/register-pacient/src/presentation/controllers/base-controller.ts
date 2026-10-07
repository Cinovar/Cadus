// Helpers
import {
  badRequest,
  conflict,
  notFound,
  serverError,
} from "../helpers/http-helper";
import type { ILogger } from "../helpers/logger-helper";
import type { IValidator } from "../helpers/validator-helper";
import type { HttpRequest, HttpResponse } from "../protocol-interfaces/http";
// Errors
import type { ApplicationError } from "../../application/errors/application-error";

export abstract class BaseController<Input> {
  protected readonly _validator: IValidator<Input>;
  protected readonly _logger: ILogger;

  constructor(validator: IValidator<Input>, logger: ILogger) {
    this._validator = validator;
    this._logger = logger;
  }

  protected handleError(error: ApplicationError): HttpResponse {
    const statusMap: Record<string, () => HttpResponse> = {
      BAD_REQUEST: () => badRequest(error),
      CONFLICT: () => conflict(error),
      RESOURCE_NOT_FOUND: () => notFound(error),
    };
    const handler = statusMap[error.code];

    if (!handler) {
      this._logger.error({
        event: "unmapped_error",
        code: error.code,
        message: error.message,
      });
      return serverError(error);
    }

    return handler();
  }

  abstract handle(req: HttpRequest): Promise<HttpResponse>;
}
