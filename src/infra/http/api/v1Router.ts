import express from 'express'
import { userRouter } from './user.routes'
import { appointmentRouter } from './appointment.routes'

const v1Router = express.Router()

v1Router.get('/', (req, res) => {
  res.json({ message: 'Api v1 funcionando' })
})
v1Router.use((req,res,next)=> {
  console.log(req.url)
  return next()
})

v1Router.use('/users', userRouter)
v1Router.use('/appointments', appointmentRouter)

export { v1Router }
