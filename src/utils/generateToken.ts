import { randomBytes } from 'crypto'

const generateToken = (length: number): string =>
  randomBytes(length % 2 ? length / 2 : length)
    .toString('hex')
    .slice(length % 2 ? 0 : length)
    .toUpperCase()

export default generateToken