export interface ISessaoRepositorio {
  criar(cpf: string, token: string, expiresAt: Date): Promise<void>
  buscarPorToken(token: string): Promise<{ ativo: boolean } | null>
  invalidar(token: string): Promise<void>
}
