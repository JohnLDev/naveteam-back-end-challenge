import Naver from '../models/Naver'
import { validate } from 'uuid'
import AppError from '../errors/AppError'
import { getCustomRepository } from 'typeorm'
import NaverRepository from '../repositories/NaverRepository'

class ShowNaverService {
  public async execute(id: string, user_id: string): Promise<Naver> {
    const naverRepository = getCustomRepository(NaverRepository)
    const isUuid = validate(id)
    if (!isUuid) {
      throw new AppError('Please inform a valid indentifier(uuid).')
    }
    const naver = await naverRepository.showOneById(id, user_id)
    if (!naver) {
      throw new AppError('Naver not found', 404)
    }
    return naver
  }
}

export default ShowNaverService
