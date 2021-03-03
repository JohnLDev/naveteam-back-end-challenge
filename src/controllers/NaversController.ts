import { Request, Response } from 'express'
import FilterNaverService from '../services/naver/IndexNaverService'
import CreateNaverService from '../services/naver/CreateNaverService'
import DeleteNaverService from '../services/naver/DeleteNaverService'

import ShowNaverService from '../services/naver/ShowNaverService'
import UpdateNaverService from '../services/naver/UpdateNaverService'
import NaverView from '../views/NaverView'

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const { name, admission_date, job_role } = request.query as never
    const user_id = request.user.id

    const navers = await FilterNaverService.execute({
      user_id,
      name,
      admission_date,
      job_role,
    })
    return response.status(200).json(NaverView.renderMany(navers))
  },
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as never
    const user_id = request.user.id

    const naver = await ShowNaverService.execute(id, user_id)

    return response.status(200).json(NaverView.render(naver))
  },
  async store(request: Request, response: Response): Promise<Response> {
    const id = request.user.id
    const { name, birthdate, admission_date, job_role, projects } = request.body
    const naver = await CreateNaverService.execute({
      id,
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    })
    return response.status(201).json(NaverView.render(naver))
  },
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const user_id = request.user.id
    const { name, birthdate, admission_date, job_role, projects } = request.body

    const naver = await UpdateNaverService.execute({
      id,
      user_id,
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    })
    return response.status(200).json(NaverView.render(naver))
  },
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const user_id = request.user.id
    await DeleteNaverService.execute({ id, user_id })
    return response.status(200).json({ message: 'Naver Deleted' })
  },
}
