import express from 'express'
import { userController } from './user.controller'

const userRoute = express.Router()

userRoute.get('/me',userController.findMe)
userRoute.put('/me',userController.updateMe)


export default userRoute