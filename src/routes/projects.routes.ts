import { Router } from 'express'
import ensureAuthenticated from '../middlewares/ensureaAuthenticated'
import CreateProjectService from '../services/CreateProjectService'
import IndexProjectService from '../services/IndexProjecService'

const projectsRouter = Router()
projectsRouter.use(ensureAuthenticated)

projectsRouter.get('/index', async (request, response) => {
  const user_id = request.user.id
  const { name } = request.query as never
  const indexProjectService = new IndexProjectService()
  const projects = await indexProjectService.execute({ name, user_id })
  return response.status(200).json(projects)
})

projectsRouter.post('/store', async (request, response) => {
  const user_id = request.user.id
  const { name, navers } = request.body

  const createProjectService = new CreateProjectService()
  const project = await createProjectService.execute({ user_id, name, navers })

  return response.status(201).json(project)
})

export default projectsRouter
