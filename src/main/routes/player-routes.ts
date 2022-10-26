import { Router } from 'express'
import { makeAddPlayerController } from '../factories/add-player'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/player', adaptRoute(makeAddPlayerController()))
}
