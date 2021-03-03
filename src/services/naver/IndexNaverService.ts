import Naver from '../../models/Naver'
import { getCustomRepository } from 'typeorm'
import AppError from '../../errors/AppError'
import NaverRepository from '../../repositories/NaverRepository'
import convertData from '../../utils/Utils'

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
    const naverRepository = getCustomRepository(NaverRepository)
    let navers = await naverRepository.findByUser(user_id)
    if (name !== undefined) {
      navers = navers.filter(naver =>
        naver.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      )
    }
    if (admission_date !== undefined) {
      navers = navers.filter(
        naver => convertData(naver.admission_date) === admission_date,
      )
    }
    if (job_role !== undefined) {
      navers = navers.filter(naver =>
        naver.job_role
          .toLocaleLowerCase()
          .includes(job_role.toLocaleLowerCase()),
      )
    }
    if (navers.length < 1) {
      throw new AppError('Naver not found', 404)
    }
    navers.map(
      naver =>
        (naver.admission_date = (convertData(
          naver.admission_date,
        ) as unknown) as Date),
    )
    navers.map(
      naver =>
        (naver.birthdate = (convertData(naver.birthdate) as unknown) as Date),
    )
    return navers
  }
}
export default new FilterNaverService()
