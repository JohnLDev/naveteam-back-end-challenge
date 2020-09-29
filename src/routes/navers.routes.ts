import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureaAuthenticated'
import CreateNaverService from '../services/CreateNaverService'
import FilterNaverService from '../services/IndexNaverService'
import ShowNaverService from '../services/ShowNaverService'

const naversRouter = Router()
naversRouter.use(ensureAuthenticated)

naversRouter.get('/show/:id', async (request, response) => {
  const { id } = request.params as never
  const user_id = request.user.id

  const showNaverService = new ShowNaverService()
  const naver = await showNaverService.execute(id, user_id)

  return response.status(200).json(naver)
})

naversRouter.get('/index', async (request, response) => {
  const { name, admission_date, job_role } = request.query as never
  const { id } = request.user
  const filterNaverService = new FilterNaverService()

  const navers = await filterNaverService.execute({
    id,
    name,
    admission_date,
    job_role,
  })
  return response.status(200).json(navers)
})

naversRouter.post('/store', async (request, response) => {
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
  return response.status(201).json(naver)
})

naversRouter.delete('/delete/:id', async (request, response) => {
  const id = request.query

  return response.status(200).json(id)
})
export default naversRouter
