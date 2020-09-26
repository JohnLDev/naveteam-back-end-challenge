import { EntityRepository, Repository } from 'typeorm'
import { User } from '../models/User'

@EntityRepository(User)
class AppointmentsRepository extends Repository<User> {
  public async findByDate(date: Date): Promise<User | null> {
    const findAppointment = await this.findOne({
      where: { date: date },
    })

    return findAppointment || null
  }
}

export default AppointmentsRepository
