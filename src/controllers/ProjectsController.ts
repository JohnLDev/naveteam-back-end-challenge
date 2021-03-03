import { Request, Response } from 'express'
import CreateProjectService from '../services/project/CreateProjectService'
import DeleteProjectService from '../services/project/DeleteProjectService'
import IndexProjectService from '../services/project/IndexProjectService'
import ShowProjectService from '../services/project/ShowProjectService'
import UpdateProjectService from '../services/project/UpdateProjectService'
import ProjectView from '../views/ProjectView'

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name } = request.query as never
    const projects = await IndexProjectService.execute({ name, user_id })
    return response.status(200).json(ProjectView.renderMany(projects))
  },

  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params

    const project = await ShowProjectService.execute({ id, user_id })

    return response.status(200).json(ProjectView.render(project))
  },

  async store(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, navers } = request.body

    const project = await CreateProjectService.execute({
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

    const project = await UpdateProjectService.execute({
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

    await DeleteProjectService.execute({ id, user_id })
    return response.status(200).json({ message: 'Project Deleted' })
  },
}
