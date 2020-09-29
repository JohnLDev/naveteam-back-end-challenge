import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Project from '../models/Projects'

interface Request {
  id: string
  user_id: string
}

class ShowProjectService {
  public async execute({ id, user_id }: Request): Promise<Project> {
    const projectRepository = getRepository(Project)
    const project = await projectRepository.findOne({
      where: { id: id, user_id: user_id },
      relations: ['navers'],
    })
    if (!project) {
      throw new AppError('Project not found', 404)
    }
    return project
  }
}

export default ShowProjectService
