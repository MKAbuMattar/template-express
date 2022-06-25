// api
export const API_AUTH = '/api/auth'
export const API_USERS = '/api/users'

// auth
export const AUTH_REGISTER = '/register'
export const AUTH_LOGIN = '/login'

// users
export const USER_UPDATE_USERNAME = '/update-username/:id'
export const USER_UPDATE_NAME = '/update-name/:id'
export const USER_UPDATE_EMAIL = '/update-email/:id'
export const USER_UPDATE_PASSWORD = '/update-password/:id'
export const USER_UPDATE_PHONE = '/update-phone/:id'
export const USER_UPDATE_ADDRESS = '/update-address/:id'
export const USER_DELETE = '/delete/:id'
export const USER_GET = '/find/:id'
export const USER_GET_ALL = '/'
export const USER_GET_ALL_STATS = '/stats'

export default {
  // api
  API_AUTH,
  API_USERS,

  // auth
  AUTH_REGISTER,
  AUTH_LOGIN,

  // users
  USER_UPDATE_USERNAME,
  USER_UPDATE_NAME,
  USER_UPDATE_EMAIL,
  USER_UPDATE_PASSWORD,
  USER_UPDATE_PHONE,
  USER_UPDATE_ADDRESS,
  USER_DELETE,
  USER_GET,
  USER_GET_ALL,
  USER_GET_ALL_STATS,
}
