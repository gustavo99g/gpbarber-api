import express from 'express'
import cors from 'cors'
import path from 'path'
import { v1Router } from './api/v1Router'

const app = express()
app.use(express.json())
app.use('/public', express.static(path.resolve(__dirname, '..','..','..', 'public')));

app.use(cors())


app.use('/api/v1', v1Router)



app.listen(3333, () => {
  console.log('Server is running!')
})
