import { Router } from 'express'
import { makeAddMatchController } from '../factories/add-match'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUpdateMatchController } from '../factories/update-match'

export default (router: Router): void => {
  router.post('/match', adaptRoute(makeAddMatchController()))
  router.patch('/match', adaptRoute(makeUpdateMatchController()))
}
