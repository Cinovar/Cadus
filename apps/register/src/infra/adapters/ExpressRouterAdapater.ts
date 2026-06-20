import type { Request, Response } from 'express'
import type { HttpRequest, HttpResponse } from '../../presentation/protocol-interfaces/Http'
import type { BaseController } from '../../presentation/controllers/BaseController'

/**
 * Adapter que converte um controller do padrão HTTP do projeto para uma rota Express
 * @param controller - Implementação de BaseController
 * @returns Função Express que pode ser usada com router.post, router.get, etc.
 */
export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}