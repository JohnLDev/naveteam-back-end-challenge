import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import Naver from '../models/Naver'
import Project from '../models/Projects'
import AppError from '../errors/AppError'

interface Request {
  user_id: string
  name: string
  navers: string[]
}

class CreateProjectService {
  public async execute({ user_id, name, navers }: Request): Promise<Project> {
    const naverRepository = getRepository(Naver)
    const projectRepository = getRepository(Project)
    if (!name || !navers) {
      throw new AppError(
        'Please insert all necessary information to create a project',
      )
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
    }
    const naversFound = await naverRepository.findByIds(navers)
    const project = projectRepository.create({
      name: name,
      navers: [...naversFound],
      user_id: user_id,
    })
    await projectRepository.save(project)
    return project
  }
}

export default CreateProjectService
