import express from 'express'
import { authControllers } from './auth.controller'
import { authSignupValidation, authValidationLogin } from './auth.validation'
import zodValidation from '../utilities/validation/zodValidation'

const authRoute = express.Router()

authRoute.post('/signup',zodValidation(authSignupValidation),authControllers.authControllerSignUp)
authRoute.post('/login',zodValidation(authValidationLogin),authControllers.authControllerLogin)

export default authRoute