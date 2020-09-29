import { Router } from 'express'
import ensureAuthenticated from '../middlewares/ensureaAuthenticated'
import CreateProjectService from '../services/CreateProjectService'

const projectsRouter = Router()
projectsRouter.use(ensureAuthenticated)

projectsRouter.post('/store', async (request, response) => {
  const user_id = request.user.id
  const { name, navers } = request.body

  const createProjectService = new CreateProjectService()
  const project = await createProjectService.execute({ user_id, name, navers })

  return response.status(200).json(project)
})

export default projectsRouter
