import dotenv from 'dotenv'

dotenv.config()

export const { NODE_ENV } = process.env
export const { PORT } = process.env
export const { DATABASE_URL } = process.env

export const { JWT_SECRET } = process.env
export const { PASS_SECRET } = process.env

export default {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  PASS_SECRET,
}
