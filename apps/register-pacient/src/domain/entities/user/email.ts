import { EmailError } from "./errors/email-errors";
import { type Either, success, failure } from "../../../shared/either";

export class Email {
  private readonly _email: string;

  constructor(email: string) {
    this._email = email;
  }

  public static create(email: string): Either<EmailError, string> {
    if (!Email.isValidFormat(email)) {
      return failure(new EmailError(email));
    }
    return success(email);
  }

  public static isValidFormat(email: string): boolean {
    let regExpTeste: RegExp =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) {
      return false;
    }
    if (email.length > 256) {
      return false;
    }
    if (!regExpTeste.test(email)) {
      return false;
    }
    const [conta = "", endereco = ""] = email.split("@");
    if (conta.length > 64) {
      return false;
    }
    let parteDominio = endereco.split(".");
    if (
      parteDominio.some(function (part) {
        return part.length > 63;
      })
    ) {
      return false;
    }
    return true;
  }

  public get value(): string {
    return this._email;
  }
}
