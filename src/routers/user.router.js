import express from 'express'

import ConstantAPI from '../constants/api.constant'
import UserController from '../controllers/user.controller'
import TokenMiddleware from '../middlewares/token.middleware'

const router = express.Router()

router.post(
  ConstantAPI.USER_UPDATE_USERNAME,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updateUsername,
)
router.post(
  ConstantAPI.USER_UPDATE_NAME,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updateName,
)
router.post(
  ConstantAPI.USER_UPDATE_EMAIL,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updateEmail,
)
router.post(
  ConstantAPI.USER_UPDATE_PASSWORD,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updatePassword,
)
router.post(
  ConstantAPI.USER_UPDATE_PHONE,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updatePhone,
)
router.post(
  ConstantAPI.USER_UPDATE_ADDRESS,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updateAddress,
)
router.post(
  ConstantAPI.USER_DELETE,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.deleteUser,
)
router.get(
  ConstantAPI.USER_GET,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.getUser,
)
router.get(
  ConstantAPI.USER_GET_ALL,
  TokenMiddleware.verifyTokenAndAdmin,
  UserController.getUsers,
)
router.get(
  ConstantAPI.USER_GET_ALL_STATS,
  TokenMiddleware.verifyTokenAndAdmin,
  UserController.getUsersStats,
)

export default router
