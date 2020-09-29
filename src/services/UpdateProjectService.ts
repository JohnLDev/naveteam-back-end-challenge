import { getCustomRepository } from 'typeorm'
import { validate } from 'uuid'

import AppError from '../errors/AppError'
import Project from '../models/Projects'
import NaverRepository from '../repositories/NaverRepository'
import ProjectRepository from '../repositories/ProjectRepository'

interface Request {
  name: string
  user_id: string
  id: string
  navers: string[]
}

class UpdateProjectService {
  public async execute({
    id,
    user_id,
    name,
    navers,
  }: Request): Promise<Project> {
    const projectRepository = getCustomRepository(ProjectRepository)
    const naverRepository = getCustomRepository(NaverRepository)
    const isUuid = validate(id)

    if (!isUuid) {
      throw new AppError('Please insert a valid indentifier(uuid)')
    }
    const project = await projectRepository.findOneById(id, user_id)

    if (!project) {
      throw new AppError('Project not found', 404)
    }

    if (navers) {
      const naversError = navers.map(async naver => {
        const naverIsUuid = validate(naver)
        if (!naverIsUuid) {
          return 'error'
        }
        const naverExist = await naverRepository.findOne(naver)
        if (!naverExist) {
          return 'error'
        }
      })
      const naversErrorExist = await Promise.all(naversError)
      if (naversErrorExist[0] === 'error') {
        throw new AppError(
          'At least one of these Navers identifiers(id) does not exist, please create your Naver before link them with a new project.',
          404,
        )
      }
      const naversFound = await naverRepository.findByIds(navers)
      project.navers = naversFound
    }
    if (name) {
      project.name = name
    }
    await projectRepository.save(project)
    return project
  }
}

export default UpdateProjectService
