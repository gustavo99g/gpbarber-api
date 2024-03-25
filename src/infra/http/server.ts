import express from 'express'
import { v1Router } from './api/v1Router'

const app = express()
app.use(express.json())
app.use('/api/v1', v1Router)



app.listen(3333, () => {
  console.log('Server is running!')
})
