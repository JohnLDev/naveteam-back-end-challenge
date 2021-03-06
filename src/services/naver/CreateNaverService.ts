import { getRepository } from 'typeorm'
import { validate } from 'uuid'
import AppError from '../../errors/AppError'
import { isValid, isAfter } from 'date-fns'
import Naver from '../../models/Naver'
import Project from '../../models/Projects'

interface Request {
  id: string
  name: string
  birthdate: Date
  admission_date: Date
  job_role: string
  projects: string[]
}
class CreateNaverService {
  public async execute({
    id,
    name,
    birthdate,
    admission_date,
    job_role,
    projects,
  }: Request): Promise<Naver> {
    const projectsRepository = getRepository(Project)
    const naversRepository = getRepository(Naver)
    if (!name || !birthdate || !admission_date || !job_role || !projects) {
      throw new AppError(
        'Please insert all necessary informations to create a Naver.',
      )
    }
    const validateBirthdate = isValid(new Date(birthdate))
    const validateAdmission_date = isValid(new Date(admission_date))

    if (
      !validateBirthdate ||
      !validateAdmission_date ||
      ((birthdate as unknown) as string).length !== 10 ||
      ((admission_date as unknown) as string).length !== 10
    ) {
      throw new AppError('Please insert a valid date yyyy-mm-dd')
    }
    if (!isAfter(new Date(), new Date(birthdate))) {
      throw new AppError('Please insert a valid birthdate')
    }

    if (!isAfter(new Date(birthdate), new Date(admission_date))) {
      throw new AppError('You can not be hired before birth')
    }

    if (!isAfter(new Date(), new Date(birthdate))) {
      throw new AppError('Please insert a valid birthdate')
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
    }

    const project = await projectsRepository.findByIds(projects)

    const naver = naversRepository.create({
      name,
      birthdate,
      admission_date,
      job_role,
      user_id: id,
      projects: [...project],
    })
    await naversRepository.save(naver)
    return naver
  }
}

export default new CreateNaverService()
