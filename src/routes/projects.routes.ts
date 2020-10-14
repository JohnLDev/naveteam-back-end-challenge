import { Router } from 'express'
import ProjectsController from '../controllers/ProjectsController'
import ensureAuthenticated from '../middlewares/ensureaAuthenticated'

const projectsRouter = Router()
projectsRouter.use(ensureAuthenticated)

projectsRouter.get('/index', ProjectsController.index)

projectsRouter.get('/show/:id', ProjectsController.show)

projectsRouter.post('/store', ProjectsController.store)

projectsRouter.put('/update/:id', ProjectsController.update)

projectsRouter.delete('/delete/:id', ProjectsController.delete)

export default projectsRouter
