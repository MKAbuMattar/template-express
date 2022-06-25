import ConstantMessage from '../constants/message.constant'
import UserService from '../services/user.service'

// http constant
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// logger
import logger from '../utils/logger.util'

export const updateUsername = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const usernameValidated = UserService.validateUsername(username)
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

    const passwordValidated = UserService.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${password} is valid`)

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }

    const usernameCheck = await UserService.findByUser(username)
    if (usernameCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_EXIST,
      })
    }

    if (user.username === username) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_NOT_CHANGE,
      })
    }

    const updatedUser = await UserService.updateUsername(id, username)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USERNAME_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updateName = async (req, res, next) => {
  try {
    const { name, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const nameValidated = UserService.validateName(name)
    if (!nameValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.NAME_NOT_VALID,
      })
    }

    const passwordValidated = UserService.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }
    logger.info(`password ${password} is valid`)

    if (user.name === name) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.NAME_NOT_CHANGE,
      })
    }
    logger.info(`name ${name} is valid`)

    const updatedUser = await UserService.updateName(id, name)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.NAME_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.NAME_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updateEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const emailValidated = UserService.validateEmail(email)
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

    const passwordValidated = UserService.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${password} is valid`)

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }
    logger.info(`password ${password} is valid`)

    if (user.email === email) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_NOT_CHANGE,
      })
    }
    logger.info(`email ${email} is valid`)

    const emailCheck = await UserService.findByEmail(email)
    if (emailCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_EXIST,
      })
    }

    const updatedUser = await UserService.updateEmail(id, email)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.EMAIL_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const { id } = req.params

    if (newPassword !== confirmPassword) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const oldPasswordValidated = UserService.validatePassword(oldPassword)
    if (!oldPasswordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${oldPassword} is valid`)

    const newPasswordValidated = UserService.validatePassword(newPassword)
    if (!newPasswordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${newPassword} is valid`)

    const confirmPasswordValidated =
      UserService.validatePassword(confirmPassword)
    if (!confirmPasswordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${confirmPassword} is valid`)

    if (oldPassword === newPassword) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_CHANGE,
      })
    }

    const isMatch = UserService.comparePassword(oldPassword, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }

    const updatedUser = await UserService.updatePassword(id, newPassword)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.PASSWORD_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updatePhone = async (req, res, next) => {
  try {
    const { phone, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const phoneValidated = UserService.validatePhone(phone)
    if (!phoneValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_NOT_VALID,
      })
    }

    const passwordValidated = UserService.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${password} is valid`)

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }
    logger.info(`password ${password} is valid`)

    if (user.phone === phone) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_NOT_CHANGE,
      })
    }

    const phoneCheck = await UserService.findByPhone(phone)
    if (phoneCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_EXIST,
      })
    }

    const updatedUser = await UserService.updatePhone(id, phone)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.PHONE_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updateAddress = async (req, res, next) => {
  try {
    const { address, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const addressValidated = UserService.validateAddress(address)
    if (!addressValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.ADDRESS_NOT_VALID,
      })
    }

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }
    logger.info(`password ${password} is valid`)

    if (user.address === address) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.ADDRESS_NOT_CHANGE,
      })
    }

    const updatedUser = await UserService.updateAddress(id, address)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.ADDRESS_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.ADDRESS_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const deletedUser = await UserService.deleteUser(id)
    if (!deletedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USER_NOT_DELETE,
      })
    }
    logger.info(`user ${user.username} deleted`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USER_DELETE_SUCCESS,
    })
  } catch (err) {
    return next(err)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    logger.info(`user ${id} found`)

    const user = await UserService.findByIdWithOutPassword(id)
    logger.info(`user ${user} found`)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USER_FOUND,
      data: {
        user,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.findAll()
    if (!users) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`users found`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USER_FOUND,
      data: {
        users,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const getUsersStats = async (req, res, next) => {
  try {
    const usersStats = await UserService.getUsersStats()
    if (!usersStats) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`users stats found`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USER_FOUND,
      data: {
        users: usersStats,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export default {
  updateUsername,
  updateName,
  updateEmail,
  updatePassword,
  updatePhone,
  updateAddress,
  deleteUser,
  getUser,
  getUsers,
  getUsersStats,
}
