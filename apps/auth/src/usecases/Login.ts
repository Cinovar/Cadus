import { Cpf } from '../entities/Cpf'
import { Senha } from '../entities/Senha'
import { type Either, failure, success } from '../shared/Either'

export interface LoginDTO {
  cpf: string
  senha: string
}

export interface LoginResultado {
  token: string
}

export class LoginUseCase {
  async execute({ cpf, senha }: LoginDTO): Promise<Either<Error, LoginResultado>> {
    const cpfResult = Cpf.create(cpf)
    if (cpfResult.isError()) {
      return failure(cpfResult.value)
    }

    const senhaResult = Senha.create(senha)
    if (senhaResult.isError()) {
      return failure(senhaResult.value)
    }

    // Passo 3: busca usuário no register (a implementar)
    // Passo 4: compara senha com hash (a implementar)
    // Passo 5: verifica bloqueio (a implementar)
    // Passo 6: gera JWT e cria sessão (a implementar)

    return success({ token: '' })
  }
}
