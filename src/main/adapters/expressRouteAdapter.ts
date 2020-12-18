import { Controller, HttpRequest } from '../../presentation/protocols'
import { RequestHandler } from 'express'

export function expressRouteAdapter(controller: Controller): RequestHandler {
  return async function (request, response) {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)

    return response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
