import { describe, test, expect } from 'vitest'
import { LoginUseCase } from '../../usecases/Login'

describe('LoginUseCase', () => {
  const usecase = new LoginUseCase()

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

  test('deve falhar com CPF vazio', async () => {
    const resultado = await usecase.execute({
      cpf: '',
      senha: 'minhasenha123'
    })
    expect(resultado.isError()).toBe(true)
  })
})
