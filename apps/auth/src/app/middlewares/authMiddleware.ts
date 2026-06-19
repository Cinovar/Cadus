import type { Request, Response, NextFunction } from 'express'
import { JwtService } from '../../infra/auth/JwtService'

const jwtService = new JwtService()

export interface AuthenticatedRequest extends Request {
  cpf?: string
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const payload = jwtService.verificar(token)
    req.cpf = payload.cpf
    next()
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' })
  }
}
