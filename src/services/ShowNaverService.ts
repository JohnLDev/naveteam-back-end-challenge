import Naver from '../models/Naver'
import { validate } from 'uuid'
import AppError from '../errors/AppError'
import { getRepository } from 'typeorm'

class ShowNaverService {
  public async execute(id: string): Promise<Naver> {
    const naverRepository = getRepository(Naver)
    const isUuid = validate(id)
    if (!isUuid) {
      throw new AppError('Please inform a valid indentificator(uuid).')
    }
    const naver = await naverRepository.findOne(id, {
      relations: ['projects'],
    })
    if (!naver) {
      throw new AppError('Naver not found', 404)
    }
    return naver
  }
}

export default ShowNaverService