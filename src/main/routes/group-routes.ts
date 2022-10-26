import { Router } from 'express'
import { makeAddGroupController } from '../factories/add-group'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/group', adaptRoute(makeAddGroupController()))
}
