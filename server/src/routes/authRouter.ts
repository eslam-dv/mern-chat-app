import { Router } from 'express'

import {
  userRegister,
  userLogin,
  userLogout,
} from '../controllers/authController.js'

const router = Router()

// @desc      Create new user
// route      POST '/api/v1/auth/register'
// @acess     Public
router.post('/register', userRegister)

// @desc      Auth user/set token
// route      POST '/api/v1/auth/login'
// @acess     Public
router.post('/login', userLogin)

// @desc      Logout user/remove token
// route      POST '/api/v1/auth/logout'
// @acess     Public
router.post('/logout', userLogout)

export default router
