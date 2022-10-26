import { Router } from 'express'
import { makeAddPositionController } from '../factories/add-position'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/position', adaptRoute(makeAddPositionController()))
}
