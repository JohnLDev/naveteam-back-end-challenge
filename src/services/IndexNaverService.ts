import Naver from '../models/Naver'
import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import { parseISO, formatISO } from 'date-fns'
interface Reequest {
  name: string
  admission_date: Date | string
  job_role: string
}

class FilterNaverService {
  public async execute({
    name,
    admission_date,
    job_role,
  }: Reequest): Promise<Naver[]> {
    const naverRepository = getRepository(Naver)
    let navers = await naverRepository.find()
    if (name !== undefined) {
      navers = navers.filter(naver => naver.name.includes(name))
    }
    if (admission_date !== undefined) {
      const date = admission_date + 'T03:00:00.000Z'
      const formatDate = formatISO(parseISO(date))
      navers = navers.filter(
        naver => formatISO(naver.admission_date) === formatDate,
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
