import { describe, expect, test, vi, beforeEach } from "vitest";
import { RegisterIdentidadeController } from "./RegisterIdentidadeController";
import type { IRegisterIdentidadeUC } from "../../application/ports/IRegisterIdentidadeUC";
import type { HttpRequest, HttpResponse } from "../protocol-interfaces/Http";
import type { IdentidadeDados } from "../../domain/entities/identidade/IdentidadeDados";
import { success, failure } from "../../shared/Either";
import type { Identidade } from "../../domain/entities/identidade/Identidade";

/**
 * Testes do RegisterIdentidadeController
 * 
 * Demonstra como a arquitetura SOLID facilita testes:
 * - Fácil mockar IRegisterIdentidadeUC (Dependency Inversion)
 * - Testes isolados de regras de negócio (Single Responsibility)
 * - ValidatorHelper pode ser testado independentemente
 */

describe("RegisterIdentidadeController", () => {
  let controller: RegisterIdentidadeController;
  let mockUseCase: IRegisterIdentidadeUC;

  // Mock de uma identidade válida
  const mockIdentidadeData: IdentidadeDados = {
    nome: "João Silva",
    cpf: "12345678901",
    dataNascimento: "1990-01-15",
    genero: "masculino",
    pronome: "ele",
    email: "joao@example.com",
    telefone: "11987654321",
    senha: "senha123",
    enderecoId: "endereco-123",
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  };

  const mockIdentidade = {
    cpf: "12345678901",
    email: "joao@example.com",
    value: mockIdentidadeData,
  } as Identidade;

  beforeEach(() => {
    // Setup: Criar mock do use case
    mockUseCase = {
      registerIdentidade: vi.fn(),
    };

    // Instanciar controller com mock (Dependency Injection)
    controller = new RegisterIdentidadeController(mockUseCase);
  });

  describe("CENÁRIOS DE SUCESSO", () => {
    test("Deve registrar identidade com dados válidos", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          cpf: "123.456.789-01",
          dataNascimento: "1990-01-15",
          genero: "masculino",
          pronome: "ele",
          email: "JOAO@EXAMPLE.COM",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      vi.mocked(mockUseCase.registerIdentidade).mockResolvedValueOnce(
        success(mockIdentidade)
      );

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockIdentidade);
      expect(mockUseCase.registerIdentidade).toHaveBeenCalledOnce();

      // Verificar que dados foram normalizados corretamente
      const callArgs = vi.mocked(mockUseCase.registerIdentidade).mock
        .calls[0][0];
      expect(callArgs.nome).toBe("João Silva"); // Trimmed
      expect(callArgs.cpf).toBe("12345678901"); // Sem pontuação
      expect(callArgs.email).toBe("joao@example.com"); // Lowercase
      expect(callArgs.telefone).toBe("11987654321"); // Sem pontuação
    });

    test("Deve ignorar campo pronome se não fornecido", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "Maria Silva",
          cpf: "987.654.321-00",
          dataNascimento: "1995-05-20",
          genero: "feminino",
          email: "maria@example.com",
          telefone: "(11) 91234-5678",
          senha: "senha456",
          enderecoId: "endereco-456",
        },
      };

      vi.mocked(mockUseCase.registerIdentidade).mockResolvedValueOnce(
        success(mockIdentidade)
      );

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(mockUseCase.registerIdentidade).toHaveBeenCalledOnce();
    });
  });

  describe("CENÁRIOS DE ERRO - Validação", () => {
    test("Deve retornar 400 quando body está faltando", async () => {
      // Arrange
      const request: HttpRequest = {};

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toContain("Corpo da requisição");
    });

    test("Deve retornar 400 quando body não é objeto", async () => {
      // Arrange
      const request: HttpRequest = {
        body: "não é objeto",
      };

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toContain("Corpo da requisição");
    });

    test("Deve retornar 400 quando campo obrigatório falta", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          cpf: "123.456.789-01",
          // dataNascimento faltando
          genero: "masculino",
          email: "joao@example.com",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toContain("Missing param: dataNascimento");
    });

    test("Deve retornar 400 quando múltiplos campos faltam", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          // cpf faltando
          // dataNascimento faltando
          genero: "masculino",
          email: "joao@example.com",
          // telefone faltando
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toContain("Missing param:");
    });

    test("Deve retornar 400 quando campo é string vazia", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "",
          cpf: "123.456.789-01",
          dataNascimento: "1990-01-15",
          genero: "masculino",
          email: "joao@example.com",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toContain("Missing param: nome");
    });

    test("Deve retornar 400 quando campo é null", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          cpf: null,
          dataNascimento: "1990-01-15",
          genero: "masculino",
          email: "joao@example.com",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toContain("Missing param: cpf");
    });
  });

  describe("CENÁRIOS DE ERRO - Use Case", () => {
    test("Deve retornar 400 quando identidade já existe", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          cpf: "123.456.789-01",
          dataNascimento: "1990-01-15",
          genero: "masculino",
          email: "joao@example.com",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      const error = new Error("A identidade já existe.");
      vi.mocked(mockUseCase.registerIdentidade).mockResolvedValueOnce(
        failure(error)
      );

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toContain("A identidade já existe");
    });

    test("Deve retornar 400 quando use case retorna erros de validação", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          cpf: "123.456.789-01",
          dataNascimento: "1990-01-15",
          genero: "masculino",
          email: "joao@example.com",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      const errors = [
        new Error("CPF inválido"),
        new Error("Email inválido"),
      ];
      vi.mocked(mockUseCase.registerIdentidade).mockResolvedValueOnce(
        failure(errors)
      );

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toContain("Dados inválidos");
      expect(response.body).toContain("CPF inválido");
      expect(response.body).toContain("Email inválido");
    });
  });

  describe("CENÁRIOS DE ERRO - Exceções", () => {
    test("Deve retornar 500 quando ocorre erro inesperado no use case", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          cpf: "123.456.789-01",
          dataNascimento: "1990-01-15",
          genero: "masculino",
          email: "joao@example.com",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      vi.mocked(mockUseCase.registerIdentidade).mockRejectedValueOnce(
        new Error("Erro de conexão com banco")
      );

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      expect(response.statusCode).toBe(500);
      expect(response.body).toBeDefined();
    });
  });

  describe("CENÁRIOS LIMITE", () => {
    test("Deve normalizar dados com espaços em branco", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "  João Silva  ",
          cpf: "123.456.789-01",
          dataNascimento: "1990-01-15",
          genero: "masculino",
          email: "  JOAO@EXAMPLE.COM  ",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      vi.mocked(mockUseCase.registerIdentidade).mockResolvedValueOnce(
        success(mockIdentidade)
      );

      // Act
      const response: HttpResponse = await controller.handle(request);

      // Assert
      const callArgs = vi.mocked(mockUseCase.registerIdentidade).mock
        .calls[0][0];
      expect(callArgs.nome).toBe("João Silva"); // Trimmed
      expect(callArgs.email).toBe("joao@example.com"); // Lowercase e trimmed
    });

    test("Deve remover caracteres especiais do CPF", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          cpf: "123.456.789-01",
          dataNascimento: "1990-01-15",
          genero: "masculino",
          email: "joao@example.com",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      vi.mocked(mockUseCase.registerIdentidade).mockResolvedValueOnce(
        success(mockIdentidade)
      );

      // Act
      await controller.handle(request);

      // Assert
      const callArgs = vi.mocked(mockUseCase.registerIdentidade).mock
        .calls[0][0];
      expect(callArgs.cpf).toBe("12345678901"); // Sem pontuação
    });

    test("Deve remover caracteres especiais do telefone", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          cpf: "123.456.789-01",
          dataNascimento: "1990-01-15",
          genero: "masculino",
          email: "joao@example.com",
          telefone: "(11) 9-8765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      vi.mocked(mockUseCase.registerIdentidade).mockResolvedValueOnce(
        success(mockIdentidade)
      );

      // Act
      await controller.handle(request);

      // Assert
      const callArgs = vi.mocked(mockUseCase.registerIdentidade).mock
        .calls[0][0];
      expect(callArgs.telefone).toBe("11987654321"); // Sem pontuação
    });

    test("Deve criar datas de auditoria automaticamente", async () => {
      // Arrange
      const request: HttpRequest = {
        body: {
          nome: "João Silva",
          cpf: "123.456.789-01",
          dataNascimento: "1990-01-15",
          genero: "masculino",
          email: "joao@example.com",
          telefone: "(11) 98765-4321",
          senha: "senha123",
          enderecoId: "endereco-123",
        },
      };

      const beforeCall = new Date();
      vi.mocked(mockUseCase.registerIdentidade).mockResolvedValueOnce(
        success(mockIdentidade)
      );

      // Act
      await controller.handle(request);
      const afterCall = new Date();

      // Assert
      const callArgs = vi.mocked(mockUseCase.registerIdentidade).mock
        .calls[0][0];
      expect(callArgs.criadoEm).toBeInstanceOf(Date);
      expect(callArgs.atualizadoEm).toBeInstanceOf(Date);
      expect(callArgs.criadoEm.getTime()).toBeGreaterThanOrEqual(
        beforeCall.getTime()
      );
      expect(callArgs.criadoEm.getTime()).toBeLessThanOrEqual(
        afterCall.getTime()
      );
    });
  });
});