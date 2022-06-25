import ConstantMessage from '../constants/message.constant'
import AuthServices from '../services/auth.service'

// http constant
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// logger
import logger from '../utils/logger.util'

export const register = async (req, res, next) => {
  try {
    const { username, name, email, password, phone, address } = req.body

    const usernameValidated = AuthServices.validateUsername(username)
    if (!usernameValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_NOT_VALID,
      })
    }
    logger.info(`username ${username} is valid`)

    const nameValidated = AuthServices.validateName(name)
    if (!nameValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.NAME_NOT_VALID,
      })
    }
    logger.info(`name ${name} is valid`)

    const emailValidated = AuthServices.validateEmail(email)
    if (!emailValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_NOT_VALID,
      })
    }
    logger.info(`email ${email} is valid`)

    const passwordValidated = AuthServices.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }

    const phoneValidated = AuthServices.validatePhone(phone)
    if (!phoneValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_NOT_VALID,
      })
    }

    const addressValidated = AuthServices.validateAddress(address)
    if (!addressValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.ADDRESS_NOT_VALID,
      })
    }

    const usernameCheck = await AuthServices.findByUser(username)
    if (usernameCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_EXIST,
      })
    }

    const emailCheck = await AuthServices.findByEmail(email)
    if (emailCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_EXIST,
      })
    }

    const phoneCheck = await AuthServices.findByPhone(phone)
    if (phoneCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_EXIST,
      })
    }

    const newUserData = {
      username,
      name,
      email,
      password,
      phone,
      address,
    }

    const user = await AuthServices.createUser(newUserData)
    if (!user) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USER_NOT_CREATE,
      })
    }

    const newUser = { ...user }._doc

    logger.info({ newUserpassword: newUser.password })

    delete newUser.password

    logger.info({ newUserpassword: newUser.password })

    return res.status(ConstantHttpCode.CREATED).json({
      status: {
        code: ConstantHttpCode.CREATED,
        msg: ConstantHttpReason.CREATED,
      },
      msg: ConstantMessage.USER_CREATE_SUCCESS,
      data: user,
    })
  } catch (err) {
    return next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const emailValidated = AuthServices.validateEmail(email)
    if (!emailValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_NOT_VALID,
      })
    }

    const passwordValidated = AuthServices.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }

    const user = await AuthServices.findByEmail(email)
    if (!user) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }

    const isMatch = AuthServices.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }

    const accessToken = await AuthServices.generateAccessToken(user)
    logger.info(`accessToken: ${accessToken}`)

    const newUser = { ...user }._doc

    logger.info({ newUserpassword: newUser.password })

    delete newUser.password

    logger.info({ newUserpassword: newUser.password })

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.LOGIN_SUCCESS,
      data: {
        user,
        accessToken,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export default {
  register,
  login,
}
