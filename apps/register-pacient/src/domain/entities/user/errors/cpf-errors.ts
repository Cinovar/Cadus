import type { DomainError } from "../../../errors/domain-error";

export class CpfError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The cpf is invalid.${textError}`);
    this.name = "CpfError";
  }
}

export class NoFieldExistsCpfError extends CpfError {
  constructor() {
    super(`O campo CPF não existe.`);
    this.name = "NoFieldCpfError";
  }
}

export class NoExistsCpfError extends CpfError {
  constructor(cpf: string) {
    super(`O CPF ${cpf} não existe.`);
    this.name = "NoExistsCpfError";
  }
}

export class FormatCpfError extends CpfError {
  constructor(cpf: string) {
    super(`O formato do CPF "${cpf}" não é correto.`);
    this.name = "FormatCpfError";
  }
}
