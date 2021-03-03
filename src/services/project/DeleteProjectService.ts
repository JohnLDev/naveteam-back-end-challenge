import { getCustomRepository } from 'typeorm'
import { validate } from 'uuid'
import AppError from '../../errors/AppError'

import ProjectRepository from '../../repositories/ProjectRepository'

interface Request {
  id: string
  user_id: string
}

class DeleteProjectService {
  public async execute({ id, user_id }: Request): Promise<void> {
    const projectRepository = getCustomRepository(ProjectRepository)
    const isUuid = validate(id)

    if (!isUuid) {
      throw new AppError('Please insert a valid indentifier(uuid)')
    }
    const projectExist = await projectRepository.findOneById(id, user_id)
    if (!projectExist) {
      throw new AppError('Project not found', 404)
    }
    await projectRepository.delete(id)
  }
}

export default new DeleteProjectService()
