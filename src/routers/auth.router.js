import express from 'express'

import ConstantAPI from '../constants/api.constant'
import AuthController from '../controllers/auth.controller'

const router = express.Router()

router.post(ConstantAPI.AUTH_REGISTER, AuthController.register)
router.post(ConstantAPI.AUTH_LOGIN, AuthController.login)

export default router
