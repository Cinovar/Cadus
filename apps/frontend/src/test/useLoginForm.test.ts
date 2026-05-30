import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLoginForm } from "@/hooks/useLoginForm";

describe("useLoginForm", () => {
  it("começa com campos vazios", () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.errors).toEqual({});
  });

  it("atualiza email quando digitado", () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.setEmail("usuario@example.com");
    });
    expect(result.current.email).toBe("usuario@example.com");
  });

  it("atualiza senha quando digitada", () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.setPassword("senha123");
    });
    expect(result.current.password).toBe("senha123");
  });

  it("valida e rejeita login com email inválido", async () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.setEmail("emailinvalido");
      result.current.setPassword("senha123");
    });
    
    await act(async () => {
      await result.current.handleSubmit(new Event("submit") as any);
    });
    
    expect(result.current.errors.email).toBe("Email inválido");
  });

  it("valida e rejeita login com senha muito curta", async () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.setEmail("usuario@example.com");
      result.current.setPassword("abc");
    });
    
    await act(async () => {
      await result.current.handleSubmit(new Event("submit") as any);
    });
    
    expect(result.current.errors.password).toBe("Senha deve ter no mínimo 6 caracteres");
  });

  it("limpa erros quando submissão é válida", async () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.setEmail("usuario@example.com");
      result.current.setPassword("senha123");
    });
    
    await act(async () => {
      await result.current.handleSubmit(new Event("submit") as any);
    });
    
    expect(result.current.errors).toEqual({});
  });
});
