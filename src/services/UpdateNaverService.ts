import { getRepository, getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Naver from '../models/Naver'
import Project from '../models/Projects'
import { validate } from 'uuid'
import NaverRepository from '../repositories/NaverRepository'
import { isValid } from 'date-fns'

interface Request {
  id: string
  user_id: string
  name: string
  birthdate: Date
  admission_date: Date
  job_role: string
  projects: string[]
}
class UpdateNaverService {
  public async execute({
    id,
    user_id,
    name,
    birthdate,
    admission_date,
    job_role,
    projects,
  }: Request): Promise<Naver> {
    const naverRepository = getCustomRepository(NaverRepository)
    const projectsRepository = getRepository(Project)
    const isUuid = validate(id)

    if (!isUuid) {
      throw new AppError('Please insert a valid indentifier(uuid)')
    }
    const naver = await naverRepository.findOneById(id, user_id)
    if (!naver) {
      throw new AppError('Naver not found', 404)
    }
    if (projects) {
      const projectError = projects.map(async project => {
        const projectIsUuid = validate(project)
        if (!projectIsUuid) {
          return 'error'
        }
        const projectExist = await projectsRepository.findOne(project)
        if (!projectExist) {
          return 'error'
        }
      })
      const projectErrorExist = await Promise.all(projectError)
      if (projectErrorExist[0] === 'error') {
        throw new AppError(
          'At least one of these projects identifier(id) does not exist, please create your projects before link them with a new Naver.',
          404,
        )
      }
      const project = await projectsRepository.findByIds(projects)
      naver.projects = [...project]
    }

    if (name) {
      naver.name = name
    }
    if (birthdate) {
      const validateBirthdate = isValid(new Date(birthdate))

      if (
        !validateBirthdate ||
        ((birthdate as unknown) as string).length !== 10
      ) {
        throw new AppError('Please insert a valid Birthdate yyyy-mm-dd')
      }
      naver.birthdate = birthdate
    }
    if (job_role) {
      naver.job_role = job_role
    }
    if (admission_date) {
      const validateAdmission_date = isValid(new Date(admission_date))

      if (
        !validateAdmission_date ||
        ((admission_date as unknown) as string).length !== 10
      ) {
        throw new AppError('Please insert a valid Admission_date yyyy-mm-dd')
      }
      naver.admission_date = admission_date
    }
    await naverRepository.save(naver)
    return naver
  }
}

export default UpdateNaverService
