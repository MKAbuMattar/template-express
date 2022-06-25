import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import { DATABASE_URL } from './env/variable.env'
import connectDb from './config/db.config'

// http constant
import ConstantHttpCode from './constants/http.code.constant'
import ConstantHttpReason from './constants/http.reason.constant'

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
    res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      API: 'Work',
    })
  } catch (err) {
    next(err)
  }
})

export default app
