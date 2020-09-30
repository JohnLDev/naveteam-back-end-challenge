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

  public async findOneById(
    id: string,
    user_id: string,
  ): Promise<Project | undefined> {
    const findProject = await this.findOne({
      where: { id: id, user_id: user_id },
    })
    return findProject
  }

  public async showOneById(
    id: string,
    user_id: string,
  ): Promise<Project | undefined> {
    const findProject = await this.findOne({
      where: { id: id, user_id: user_id },
      relations: ['navers'],
    })

    return findProject
  }

  public async findByUser(user_id: string): Promise<Project[]> {
    const findProject = await this.find({
      where: { user_id: user_id },
    })

    return findProject
  }
}

export default ProjectRepository
