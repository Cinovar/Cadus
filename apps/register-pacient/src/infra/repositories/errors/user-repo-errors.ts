export class PrismaUserRepoDataCorruptionError extends Error {
  constructor(campo: string, motivo: string) {
    super(
      `Dado corrompido no banco ao reconstituir User (${campo}): ${motivo}`,
    );
    this.name = "PrismaIdentidadeRepositoryDataCorruptionError";
  }
}