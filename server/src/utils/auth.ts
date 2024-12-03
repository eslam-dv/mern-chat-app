import jwt from 'jsonwebtoken'
import { Response } from 'express'

const generateToken = async (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, `${process.env.JWT_SECRET}`, {
    expiresIn: '1d',
  })
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: `${process.env.NODE_ENV}` !== 'developemnt',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24h
  })
}

const clearToken = async (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
}

export { generateToken, clearToken }
