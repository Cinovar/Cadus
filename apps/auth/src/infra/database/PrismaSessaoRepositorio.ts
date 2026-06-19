import { prisma } from '../adapters/db'
import type { ISessaoRepositorio } from './ISessaoRepositorio'

export class PrismaSessaoRepositorio implements ISessaoRepositorio {
  async criar(cpf: string, token: string, expiresAt: Date): Promise<void> {
    await prisma.sessao.create({
      data: { cpf, token, expiresAt }
    })
  }

  async buscarPorToken(token: string): Promise<{ ativo: boolean } | null> {
    const sessao = await prisma.sessao.findUnique({ where: { token } })
    if (!sessao) return null
    return { ativo: sessao.ativo }
  }

  async invalidar(token: string): Promise<void> {
    await prisma.sessao.update({
      where: { token },
      data: { ativo: false }
    })
  }
}
