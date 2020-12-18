import { Router } from 'express'

export function signUpRoute(router: Router): void {
  router.post('/signup', (request, response) => {
    response.json({ feedback: 'ok' })
  })
}
