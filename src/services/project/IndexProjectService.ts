import { getCustomRepository } from 'typeorm'
import AppError from '../../errors/AppError'
import Project from '../../models/Projects'
import ProjectRepository from '../../repositories/ProjectRepository'

interface Request {
  user_id: string
  name: string
}
class IndexProjectService {
  public async execute({ name, user_id }: Request): Promise<Project[]> {
    const projectRepository = getCustomRepository(ProjectRepository)
    const projects = await projectRepository.findByUser(user_id)
    if (projects.length < 1) {
      throw new AppError('Projects not found', 404)
    }

    if (name) {
      const FilteredProjects = projects.filter(project =>
        project.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      )
      if (FilteredProjects.length < 1) {
        throw new AppError('Projects not found', 404)
      }
      return FilteredProjects
    } else {
      return projects
    }
  }
}

export default new IndexProjectService()
