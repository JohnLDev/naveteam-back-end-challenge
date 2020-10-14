import { Request, Response } from 'express'
import FilterNaverService from '../services/IndexNaverService'
import CreateNaverService from '../services/CreateNaverService'
import DeleteNaverService from '../services/DeleteNaverService'

import ShowNaverService from '../services/ShowNaverService'
import UpdateNaverService from '../services/UpdateNaverService'
import NaverView from '../views/NaverView'

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const { name, admission_date, job_role } = request.query as never
    const user_id = request.user.id
    const filterNaverService = new FilterNaverService()

    const navers = await filterNaverService.execute({
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

    const showNaverService = new ShowNaverService()
    const naver = await showNaverService.execute(id, user_id)

    return response.status(200).json(NaverView.render(naver))
  },
  async store(request: Request, response: Response): Promise<Response> {
    const id = request.user.id
    const { name, birthdate, admission_date, job_role, projects } = request.body
    const createNaverService = new CreateNaverService()
    const naver = await createNaverService.execute({
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
    const updateNaverService = new UpdateNaverService()
    const naver = await updateNaverService.execute({
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
    const deleteNaverService = new DeleteNaverService()
    await deleteNaverService.execute({ id, user_id })
    return response.status(200).json({ message: 'Naver Deleted' })
  },
}
