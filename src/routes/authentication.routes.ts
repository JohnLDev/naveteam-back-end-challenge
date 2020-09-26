import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'
import AuthenticateUserService from '../services/AuthenticateUserService'

const authenticationRouter = Router()

authenticationRouter.post('/signup', async (request, response) => {
  const { name, email, password } = request.body
  const createUserService = new CreateUserService()
  const user = await createUserService.execute({
    name,
    email,
    password,
  })
  return response.status(201).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  })
})

authenticationRouter.post('/login', async (request, response) => {
  const { email, password } = request.body
  const authenticateUserService = new AuthenticateUserService()
  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  })
  return response.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
    token,
  })
})
export default authenticationRouter
