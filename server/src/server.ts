import express, { Application } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'express-async-errors'

// Import Routes
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

// Import Middleware
import errorHandler from './middlewares/errMiddleware.js'

const { PORT, MONGO_URI } = process.env

const app: Application = express()
const port: number = Number(PORT) || 3000

// Middleware
app.use(cors()) // allow cross-origin
app.use(express.json()) // gives access to req.body
app.use(cookieParser()) // gives access to res.cookie & req.cookies

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use(errorHandler)

// Connect to DB
connect(`${MONGO_URI}`)
  .then(() => console.log('MongoDB is connected successfully'))
  .catch((err) => console.error(err))

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
