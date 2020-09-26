import { Router } from 'express'
import naversRouter from './navers.routes'
import projectsRouter from './projects.routes'
import authenticationRouter from './authentication.routes'

const routes = Router()

routes.use('/authentication', authenticationRouter)
routes.use('/navers', naversRouter)
routes.use('/projects', projectsRouter)

export default routes
