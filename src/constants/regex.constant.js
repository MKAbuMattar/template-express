export const USERNAME = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,32}$/
export const EMAIL =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export const NAME = /^[a-zA-Z ]{2,35}$/
export const PHONE =
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm
export const ADDRESS = /^[a-zA-Z0-9\s,'-]{10,200}$/

export default {
  USERNAME,
  EMAIL,
  PASSWORD,
  NAME,
  PHONE,
  ADDRESS,
}
