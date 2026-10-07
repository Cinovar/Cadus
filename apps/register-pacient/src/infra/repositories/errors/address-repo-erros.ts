export class AddressRepoDataCorruptionError extends Error {
  constructor(field: string, reason: string) {
    super(
      `Dado corrompido no banco ao reconstituir Endereco (${field}): ${reason}`,
    );
    this.name = "PrismaEnderecoRepositoryDataCorruptionError";
  }
}

export class AddressNotFoundError extends Error {
  constructor(zipCode: string) {
    super(`Endereço com CEP "${zipCode}" não encontrado.`);
    this.name = "EnderecoNaoEncontradoError";
  }
}
