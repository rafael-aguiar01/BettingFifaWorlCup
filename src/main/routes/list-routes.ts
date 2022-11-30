import { Router } from 'express'
import { makeListPointsController } from '../factories/list-points'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/list', adaptRoute(makeListPointsController()))
}
