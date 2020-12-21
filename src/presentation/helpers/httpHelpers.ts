import { HttpResponse } from '../protocols'
import { ServerError } from '../errors'

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function serverError(error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

export function creationRequestSuccess(body: any): HttpResponse {
  return {
    statusCode: 201,
    body
  }
}
