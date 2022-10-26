import { Router } from 'express'
import { makeAddMatchController } from '../factories/add-match'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/match', adaptRoute(makeAddMatchController()))
}
