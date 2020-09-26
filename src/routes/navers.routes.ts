import { Router } from 'express'
import ensureAuthenticated from '../middlewares/ensureaAuthenticated'
import CreateNaverService from '../services/CreateNaverService'

const naversRouter = Router()
naversRouter.use(ensureAuthenticated)

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
export default naversRouter
