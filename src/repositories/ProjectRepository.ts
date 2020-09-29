import { EntityRepository, Repository } from 'typeorm'
import Project from '../models/Projects'

@EntityRepository(Project)
class ProjectRepository extends Repository<Project> {
  public async findByName(name: string, user_id: string): Promise<Project[]> {
    const findProject = await this.find({
      where: { name: name, user_id: user_id },
    })

    return findProject
  }
}

export default ProjectRepository
