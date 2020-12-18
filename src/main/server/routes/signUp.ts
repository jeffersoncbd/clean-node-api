import { Router } from 'express'
import { expressRouteAdapter } from '../../adapters/expressRouteAdapter'
import { makeSignUpController } from '../../factories/signup'

export function signUpRoute(router: Router): void {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
}
