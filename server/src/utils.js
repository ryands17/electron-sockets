import dotenv from 'dotenv'

dotenv.config()

export function getRandomNumber(limit = 100) {
  return Math.floor(Math.random() * limit)
}
