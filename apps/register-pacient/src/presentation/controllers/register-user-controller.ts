import type { HttpRequest, HttpResponse } from "../protocol-interfaces/http";
import type { BaseController } from "./base-controller";

export class RegisterUserController implements BaseController {
  private readonly _REQUIRED_BODY_FIELDS = [
    "name",
    "cpf",
    "birthDate",
    "gender",
    "email",
    "telephone",
    "password",
    "address",
  ];
  private readonly registerUserUC: IRegisterUserUC;

  constructor() {}

  private handle(req: HttpRequest): Promise<HttpResponse> {
    try {
    } catch (error) {}
  }
}
