import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { AuthenticationError } from '../middlewares/errMiddleware.js'

const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user
  if (!user) {
    throw new AuthenticationError('You have to be logged in to view your profile')
  }
  res.status(200).json({ message: 'user logged in', user })
})

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user
  if (!user) {
    throw new AuthenticationError('You have to be logged in to edit your profile')
  }

  res.status(200).json({ message: 'logged in', user })
})

export { getProfile, updateProfile }
