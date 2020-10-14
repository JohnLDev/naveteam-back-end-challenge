import Naver from '../models/Naver'
import Project from '../models/Projects'

interface Response {
  id: string
  name: string
  user_id: string
  navers: Naver[]
  created_at: Date
  updated_at: Date
}
export default {
  render(project: Project): Response {
    return {
      id: project.id,
      name: project.name,
      user_id: project.user_id,
      navers: project.navers,
      created_at: project.created_at,
      updated_at: project.updated_at,
    }
  },
  renderMany(projects: Project[]): Response[] {
    return projects.map(project => this.render(project))
  },
}
