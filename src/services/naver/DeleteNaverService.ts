import { getCustomRepository } from 'typeorm'
import { validate } from 'uuid'
import AppError from '../../errors/AppError'
import NaverRepository from '../../repositories/NaverRepository'

interface Request {
  id: string
  user_id: string
}
class DeleteNaverService {
  public async execute({ id, user_id }: Request): Promise<void> {
    const naverRepository = getCustomRepository(NaverRepository)
    const isUuid = validate(id)

    if (!isUuid) {
      throw new AppError('Please insert a valid indentifier(uuid)')
    }

    const naverExist = await naverRepository.findOneById(id, user_id)
    if (!naverExist) {
      throw new AppError('Naver not found', 404)
    }
    await naverRepository.delete(id)
  }
}

export default new DeleteNaverService()
