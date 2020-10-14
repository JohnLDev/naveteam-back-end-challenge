import Naver from '../models/Naver'
import Project from '../models/Projects'

interface Response {
  id: string
  user_id: string
  name: string
  birthdate: Date
  admission_date: Date
  job_role: string
  projects: Project[] | []
  created_at: Date
  updated_at: Date
}
export default {
  render(naver: Naver): Response {
    return {
      id: naver.id,
      user_id: naver.user_id,
      name: naver.name,
      birthdate: naver.birthdate,
      admission_date: naver.admission_date,
      job_role: naver.job_role,
      projects: naver.projects,
      created_at: naver.created_at,
      updated_at: naver.updated_at,
    }
  },
  renderMany(navers: Naver[]): Response[] {
    return navers.map(naver => this.render(naver))
  },
}
