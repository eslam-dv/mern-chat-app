import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import UserModel from '../models/UserModel.js'
import { AuthenticationError, BaseError } from '../middlewares/errMiddleware.js'
import { clearToken, generateToken } from '../utils/auth.js'

const userRegister = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body
  if (!email || !name || !password) {
    throw new BaseError(400, 'All feilds are required')
  }

  const userExist = await UserModel.findOne({ email })
  if (userExist) {
    throw new BaseError(400, 'User already exists')
  }

  const user = await UserModel.create({ email, name, password })
  if (!user) {
    throw new BaseError(400, 'Someting went wrong with user creation')
  }
  generateToken(res, user.id)
  res
    .status(201)
    .json({ message: 'User created successfully!', success: true, user })
})

const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BaseError(400, 'All feilds are required')
  }

  const user = await UserModel.findOne({ email })
  if (user && (await user.verifyPassword(password))) {
    generateToken(res, user.id)
    res
      .status(200)
      .json({ message: 'User logged in successfully!', success: true, user })
  } else {
    throw new AuthenticationError('Wrong credintials')
  }
})

const userLogout = (req: Request, res: Response) => {
  clearToken(res)
  res
    .status(200)
    .json({ message: 'User logged out successfully', success: true })
}

export { userRegister, userLogin, userLogout }
