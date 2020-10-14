import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureaAuthenticated'
import NaversController from '../controllers/NaversController'

const naversRouter = Router()
naversRouter.use(ensureAuthenticated)

naversRouter.get('/show/:id', NaversController.show)

naversRouter.get('/index', NaversController.index)

naversRouter.post('/store', NaversController.store)

naversRouter.put('/update/:id', NaversController.update)

naversRouter.delete('/delete/:id', NaversController.delete)
export default naversRouter
