import Naver from '../models/Naver'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import NaverRepository from '../repositories/NaverRepository'

interface Request {
  user_id: string
  name: string
  admission_date: Date | string
  job_role: string
}

class FilterNaverService {
  public async execute({
    user_id,
    name,
    admission_date,
    job_role,
  }: Request): Promise<Naver[]> {
    function convertData(data: Date) {
      const date = new Date(data)
      const mnth = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + (date.getDate() + 1)).slice(-2)

      return [date.getFullYear(), mnth, day].join('-')
    }

    const naverRepository = getCustomRepository(NaverRepository)
    let navers = await naverRepository.findByUser(user_id)
    if (name !== undefined) {
      navers = navers.filter(naver => naver.name.includes(name))
    }
    if (admission_date !== undefined) {
      navers = navers.filter(
        naver => convertData(naver.admission_date) === admission_date,
      )
    }
    if (job_role !== undefined) {
      navers = navers.filter(naver => naver.job_role === job_role)
    }
    if (navers.length < 1) {
      throw new AppError('Naver not found', 404)
    }
    return navers
  }
}
export default FilterNaverService
