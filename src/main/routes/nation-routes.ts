import { Router } from 'express'
import { makeAddNationController } from '../factories/add-nation'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/nation', adaptRoute(makeAddNationController()))
}
