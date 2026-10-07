import type { Request, Response } from "express";
import type {
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocol-interfaces/http";
import type { BaseController } from "../../presentation/controllers/base-controller";

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };
    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
