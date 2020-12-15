import { HttpResponse } from '../protocols'
import { ServerError } from '../errors'

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
