import { Request, Response } from 'express'
import CreateProjectService from '../services/CreateProjectService'
import DeleteProjectService from '../services/DeleteProjectService'
import IndexProjectService from '../services/IndexProjecService'
import ShowProjectService from '../services/ShowProjectService'
import UpdateProjectService from '../services/UpdateProjectService'
import ProjectView from '../views/ProjectView'

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name } = request.query as never
    const indexProjectService = new IndexProjectService()
    const projects = await indexProjectService.execute({ name, user_id })
    return response.status(200).json(ProjectView.renderMany(projects))
  },

  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params

    const showProjectService = new ShowProjectService()
    const project = await showProjectService.execute({ id, user_id })

    return response.status(200).json(ProjectView.render(project))
  },

  async store(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, navers } = request.body

    const createProjectService = new CreateProjectService()
    const project = await createProjectService.execute({
      user_id,
      name,
      navers,
    })

    return response.status(201).json(ProjectView.render(project))
  },

  async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params
    const { name, navers } = request.body

    const updateProjectService = new UpdateProjectService()
    const project = await updateProjectService.execute({
      user_id,
      id,
      name,
      navers,
    })

    return response.status(200).json(ProjectView.render(project))
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params

    const deleteProjectService = new DeleteProjectService()
    await deleteProjectService.execute({ id, user_id })
    return response.status(200).json({ message: 'Project Deleted' })
  },
}
