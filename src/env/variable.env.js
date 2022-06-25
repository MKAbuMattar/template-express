import dotenv from 'dotenv'

dotenv.config()

export const { NODE_ENV } = process.env
export const { PORT } = process.env
export const { DATABASE_URL } = process.env

export const { JWT_SECRET } = process.env
export const { PASS_SECRET } = process.env
export const { STRIPE_KEY } = process.env

export const { CLOUDINARY_CLOUD_NAME } = process.env
export const { CLOUDINARY_API_KEY } = process.env
export const { CLOUDINARY_API_SECRET } = process.env

export const { IMBB_CLIENT_API_KEY } = process.env

export default {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  PASS_SECRET,
  STRIPE_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  IMBB_CLIENT_API_KEY,
}
