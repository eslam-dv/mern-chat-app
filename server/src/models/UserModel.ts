import { Schema, model, Document } from 'mongoose'
import { hash, compare, genSalt } from 'bcrypt'

export interface IUser extends Document {
  id: string
  email: string
  name: string
  password: string
  createdAt: Date
  verifyPassword: (enteredPassword: string) => boolean
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: [true, 'email required'], unique: true },
  name: { type: String, required: [true, 'username required'], unique: true },
  password: { type: String, required: [true, 'password required'] },
  createdAt: { type: Date, default: new Date() },
})

// Hash password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
  next()
})

// When returning model remove password, __v & change ID from _id to id & turn into string
userSchema.set('toJSON', {
  transform(_, ret) {
    ;(ret.id = ret._id.toString()),
      (ret._id = undefined),
      (ret.password = undefined),
      (ret.__v = undefined)
  },
})

userSchema.methods.verifyPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  const isValid = await compare(enteredPassword, this.password)
  return isValid
}

export default model<IUser>('user', userSchema)
