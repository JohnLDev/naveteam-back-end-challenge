import { EntityRepository, Repository } from 'typeorm'
import Naver from '../models/Naver'

@EntityRepository(Naver)
class NaverRepository extends Repository<Naver> {
  public async findOneById(
    id: string,
    user_id: string,
  ): Promise<Naver | undefined> {
    const findNaver = await this.findOne({
      where: { id: id, user_id: user_id },
    })

    return findNaver
  }

  public async showOneById(
    id: string,
    user_id: string,
  ): Promise<Naver | undefined> {
    const findNaver = await this.findOne({
      where: { id: id, user_id: user_id },
      relations: ['projects'],
    })

    return findNaver
  }
}

export default NaverRepository
