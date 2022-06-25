import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import connectDb from './config/db.config'
import { DATABASE_URL } from './env/variable.env'

// http constant
import ConstantHttpCode from './constants/http.code.constant'
import ConstantHttpReason from './constants/http.reason.constant'

// api constant
import ConstantAPI from './constants/api.constant'

// routers
import AuthRouter from './routers/auth.router'
import UserRouter from './routers/user.router'

connectDb(DATABASE_URL)

const app = express()

// helmet
app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res, next) => {
  try {
    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      API: 'Work',
    })
  } catch (err) {
    return next(err)
  }
})

app.use(ConstantAPI.API_AUTH, AuthRouter)
app.use(ConstantAPI.API_USERS, UserRouter)

export default app
