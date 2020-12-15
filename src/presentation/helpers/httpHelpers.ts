import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors/ServerError'

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function serverError(): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
