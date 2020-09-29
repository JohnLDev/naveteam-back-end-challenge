import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Naver from '../models/Naver'

class DeleteNaverService {
  public async execute(id: string, user_id: string): Promise<void> {
    const naverRepository = getRepository(Naver)
    const naverExist = await naverRepository.findOne({
      where: { id: id, user_id: user_id },
    })
    if (!naverExist) {
      throw new AppError('Naver not found', 404)
    }
    await naverRepository.delete(id)
  }
}

export default DeleteNaverService
