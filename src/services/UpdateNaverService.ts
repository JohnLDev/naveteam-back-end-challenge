import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Naver from '../models/Naver'
import Project from '../models/Projects'
import { validate } from 'uuid'

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
    const naverRepository = getRepository(Naver)
    const projectsRepository = getRepository(Project)
    const naver = await naverRepository.findOne({
      where: { id: id, user_id: user_id },
    })
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
      naver.birthdate = birthdate
    }
    if (job_role) {
      naver.job_role = job_role
    }
    if (admission_date) {
      naver.admission_date = admission_date
    }
    await naverRepository.save(naver)
    return naver
  }
}

export default UpdateNaverService
