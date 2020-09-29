import { Router } from 'express'
import ensureAuthenticated from '../middlewares/ensureaAuthenticated'
import CreateProjectService from '../services/CreateProjectService'
import IndexProjectService from '../services/IndexProjecService'
import ShowProjectService from '../services/ShowProjectService'

const projectsRouter = Router()
projectsRouter.use(ensureAuthenticated)

projectsRouter.get('/index', async (request, response) => {
  const user_id = request.user.id
  const { name } = request.query as never
  const indexProjectService = new IndexProjectService()
  const projects = await indexProjectService.execute({ name, user_id })
  return response.status(200).json(projects)
})

projectsRouter.get('/show/:id', async (request, response) => {
  const user_id = request.user.id
  const { id } = request.params

  const showProjectService = new ShowProjectService()
  const project = await showProjectService.execute({ user_id, id })

  return response.status(200).json(project)
})

projectsRouter.post('/store', async (request, response) => {
  const user_id = request.user.id
  const { name, navers } = request.body

  const createProjectService = new CreateProjectService()
  const project = await createProjectService.execute({ user_id, name, navers })

  return response.status(201).json(project)
})

projectsRouter.put('/update/:id', async (request, response) => {
  const { id } = request.params
  const { name, navers } = request.body
})

export default projectsRouter
