import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import UserModel from '../models/UserModel.js'
import { AuthenticationError } from './errMiddleware.js'

interface IJwtPayload extends JwtPayload {
  userId: string
}

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token
    token = req.cookies.jwt

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          `${process.env.JWT_SECRET}`,
        ) as IJwtPayload
        req.user = await UserModel.findById(decoded.userId)
      } catch (err) {
        throw new AuthenticationError('invalid token')
      }
    }
    next()
  },
)
