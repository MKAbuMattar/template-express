import jwt from 'jsonwebtoken'

import ConstantMessage from '../constants/message.constant'
import { JWT_SECRET } from '../env/variable.env'

// http constant
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// logger
import logger from '../utils/logger.util'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  logger.info(`authHeader: ${authHeader}`)
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    return jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(ConstantHttpCode.FORBIDDEN).json({
          status: {
            code: ConstantHttpCode.FORBIDDEN,
            msg: ConstantHttpReason.FORBIDDEN,
          },
          msg: ConstantMessage.TOKEN_NOT_VALID,
        })
      }
      req.user = user
      return next()
    })
  }

  return res.status(ConstantHttpCode.UNAUTHORIZED).json({
    status: {
      code: ConstantHttpCode.UNAUTHORIZED,
      msg: ConstantHttpReason.UNAUTHORIZED,
    },
    msg: ConstantMessage.NOT_AUTHENTICATED,
  })
}

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next()
    }

    return res.status(ConstantHttpCode.FORBIDDEN).json({
      status: {
        code: ConstantHttpCode.FORBIDDEN,
        msg: ConstantHttpReason.FORBIDDEN,
      },
      msg: ConstantMessage.NOT_ALLOWED,
    })
  })
}

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next()
    }

    return res.status(ConstantHttpCode.FORBIDDEN).json({
      status: {
        code: ConstantHttpCode.FORBIDDEN,
        msg: ConstantHttpReason.FORBIDDEN,
      },
      msg: ConstantMessage.NOT_ALLOWED,
    })
  })
}

export default {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
}
