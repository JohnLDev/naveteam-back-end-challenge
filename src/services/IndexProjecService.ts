import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Project from '../models/Projects'
import ProjectRepository from '../repositories/ProjectRepository'

interface Request {
  user_id: string
  name: string
}
class IndexProjectService {
  public async execute({ name, user_id }: Request): Promise<Project[]> {
    const projectRepository = getCustomRepository(ProjectRepository)
    if (name) {
      const projects = await projectRepository.findByName(name, user_id)
      if (projects.length < 1) {
        throw new AppError('Projects not found', 404)
      }
      return projects
    } else {
      const projects = await projectRepository.find()
      if (projects.length < 1) {
        throw new AppError('Projects not found', 404)
      }
      return projects
    }
  }
}

export default IndexProjectService
