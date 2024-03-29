import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import homeRouter from './routes/home'
import authRouter from './routes/auth'

const app: Express = express()

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', homeRouter)
app.use('/auth', authRouter)

export default app
