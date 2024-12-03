import { Router } from 'express'

import { verifyToken } from '../middlewares/authMiddleware.js'
import { getProfile, updateProfile } from '../controllers/userController.js'

const router = Router()

// @desc      Get user profile
// route      GET '/api/v1/user/profile'
// @acess     Private
router.get('/profile', verifyToken, getProfile)

// @desc      Update user profile
// route      PUT '/api/v1/user/profile'
// @acess     Private
router.put('/profile', verifyToken, updateProfile)

export default router
