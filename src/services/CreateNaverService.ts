import { getRepository } from 'typeorm'
import Naver from '../models/Naver'
import Project from '../models/Projects'

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
    name,
    birthdate,
    admission_date,
    job_role,
    projects,
  }: Request): Promise<Naver> {
    const projectsRepository = getRepository(Project)
    projects.map(async project => {
      const projectExist = await projectsRepository.find({
        where: { name: project },
      })
      if (!projectExist) {
      }
    })
  }
}

export default CreateNaverService
