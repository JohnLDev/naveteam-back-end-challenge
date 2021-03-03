import { Request, Response } from 'express'
import AuthenticateUserService from '../services/auth/AuthenticateUserService'

import CreateUserService from '../services/auth/CreateUserService'
import UserView from '../views/UserView'

export default {
  async signup(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const user = await CreateUserService.execute({
      name,
      email,
      password,
    })
    return response.status(201).json(UserView.render(user))
  },
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const { user, token } = await AuthenticateUserService.execute({
      email,
      password,
    })
    return response.status(200).json({
      user: UserView.render(user),
      token,
    })
  },
}
