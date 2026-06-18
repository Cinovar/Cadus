import { describe, test, expect } from 'vitest'
import { LoginUseCase } from '../../usecases/Login'
import type { IRegisterClient } from '../../infra/http/IRegisterClient'
import bcrypt from 'bcrypt'

const senhaHash = await bcrypt.hash('minhasenha123', 10)

const mockRegisterClient: IRegisterClient = {
  async buscarUsuarioPorCpf(cpf: string) {
    if (cpf === '52998224725') {
      return { cpf, senhaHash, email: 'victor@email.com' }
    }
    return null
  }
}

describe('LoginUseCase', () => {
  const usecase = new LoginUseCase(mockRegisterClient)

  test('deve falhar com CPF inválido', async () => {
    const resultado = await usecase.execute({
      cpf: '111.111.111-11',
      senha: 'minhasenha123'
    })
    expect(resultado.isError()).toBe(true)
  })

  test('deve falhar com senha muito curta', async () => {
    const resultado = await usecase.execute({
      cpf: '529.982.247-25',
      senha: 'abc'
    })
    expect(resultado.isError()).toBe(true)
  })

  test('deve falhar com CPF não cadastrado', async () => {
    const resultado = await usecase.execute({
      cpf: '123.456.789-09',
      senha: 'minhasenha123'
    })
    expect(resultado.isError()).toBe(true)
  })

  test('deve falhar com senha incorreta', async () => {
    const resultado = await usecase.execute({
      cpf: '529.982.247-25',
      senha: 'senhaerrada123'
    })
    expect(resultado.isError()).toBe(true)
  })

  test('deve ter sucesso com CPF e senha corretos', async () => {
    const resultado = await usecase.execute({
      cpf: '529.982.247-25',
      senha: 'minhasenha123'
    })
    expect(resultado.isSuccess()).toBe(true)
  })
})