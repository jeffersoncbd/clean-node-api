import { Controller, HttpRequest } from '../../presentation/protocols'
import { RequestHandler } from 'express'

export function expressRouteAdapter(controller: Controller): RequestHandler {
  return async function (request, response) {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode !== 200) {
      return response
        .status(httpResponse.statusCode)
        .json({ feedback: httpResponse.body.message })
    }

    return response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
