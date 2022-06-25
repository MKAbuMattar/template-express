import { connect } from 'mongoose'
import logger from '../utils/logger.util'

const connectDb = async (URL) => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    const connection = await connect(URL, connectionParams)
    logger.info(`Mongo DB is connected to: ${connection.connection.host}`)
  } catch (err) {
    logger.error(`An error ocurred\n\r\n\r${err}`)
  }
}

export default connectDb
