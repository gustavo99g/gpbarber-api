import express from 'express'
import { createUserController } from '../../../modules/users/useCases/createUser'
import { middleware } from '../middleware'
import { loginController } from '../../../modules/users/useCases/login'
import { getCurrentUserController } from '../../../modules/users/useCases/getCurrentUser'
import { updateUserController } from '../../../modules/users/useCases/updateUser'
import multer from 'multer'
import multerConfig  from '../../multer/config'
import { updateAvatarController } from '../../../modules/users/useCases/updateUserAvatar'
import { getAllProvidersController } from '../../../modules/users/useCases/getAllproviders'

const userRouter = express.Router()
const uploadAvatar = multer(multerConfig)

userRouter.post('/',(req, res)=> createUserController.handle(req,res))
userRouter.patch('/', middleware.checkAuth(),(req, res)=> updateUserController.handle(req, res))
userRouter.put('/avatar',middleware.checkAuth(),uploadAvatar.single('avatar'),(req, res)=> updateAvatarController.handle(req, res))
userRouter.get('/providers',middleware.checkAuth(),(req,res)=> getAllProvidersController.handle(req,res))

userRouter.post('/login', (req, res) => loginController.handle(req, res))

userRouter.get('/me', middleware.checkAuth(),(req, res)=> getCurrentUserController.handle(req, res))
export { userRouter }
