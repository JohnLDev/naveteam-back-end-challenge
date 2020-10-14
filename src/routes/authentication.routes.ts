import { Router } from 'express'

import AuthenticationController from '../controllers/AuthenticationController'
const authenticationRouter = Router()

authenticationRouter.post('/signup', AuthenticationController.signup)

authenticationRouter.post('/login', AuthenticationController.login)

export default authenticationRouter
