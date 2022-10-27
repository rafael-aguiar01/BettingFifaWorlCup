import { Router } from 'express'
import { makeAddPointController } from '../factories/add-point'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/point', adaptRoute(makeAddPointController()))
}
