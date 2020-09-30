import { getCustomRepository } from 'typeorm'
import { validate } from 'uuid'
import AppError from '../errors/AppError'
import Project from '../models/Projects'
import ProjectRepository from '../repositories/ProjectRepository'
import convertData from '../utils/Utils'

interface Request {
  id: string
  user_id: string
}

class ShowProjectService {
  public async execute({ id, user_id }: Request): Promise<Project> {
    const projectRepository = getCustomRepository(ProjectRepository)
    const isUuid = validate(id)

    if (!isUuid) {
      throw new AppError('Please insert a valid indentifier(uuid)')
    }
    const project = await projectRepository.showOneById(id, user_id)
    if (!project) {
      throw new AppError('Project not found', 404)
    }
    project.navers.map(
      naver =>
        (naver.admission_date = (convertData(
          naver.admission_date,
        ) as unknown) as Date),
    )

    project.navers.map(
      naver =>
        (naver.birthdate = (convertData(naver.birthdate) as unknown) as Date),
    )
    return project
  }
}

export default ShowProjectService
