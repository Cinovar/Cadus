import { Cpf } from '../entities/Cpf'
import { Senha } from '../entities/Senha'
import { type Either, failure, success } from '../shared/Either'
import type { IRegisterClient } from '../infra/http/IRegisterClient'
import bcrypt from 'bcrypt'

export interface LoginDTO {
  cpf: string
  senha: string
}

export interface LoginResultado {
  token: string
}

export class LoginUseCase {
  constructor(private readonly registerClient: IRegisterClient) {}

  async execute({ cpf, senha }: LoginDTO): Promise<Either<Error, LoginResultado>> {
    // Passo 1: valida formato do CPF
    const cpfResult = Cpf.create(cpf)
    if (cpfResult.isError()) {
      return failure(cpfResult.value)
    }

    // Passo 2: valida formato da senha
    const senhaResult = Senha.create(senha)
    if (senhaResult.isError()) {
      return failure(senhaResult.value)
    }

    // Passo 3: busca usuário no register
    const usuario = await this.registerClient.buscarUsuarioPorCpf(cpfResult.value.value)
    if (!usuario) {
      return failure(new Error('CPF não cadastrado'))
    }

    // Passo 4: compara senha com hash
    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash)
    if (!senhaCorreta) {
      return failure(new Error('Senha incorreta'))
    }

    // Passo 5: verifica bloqueio (a implementar)
    // Passo 6: gera JWT e cria sessão (a implementar)

    return success({ token: '' })
  }
}