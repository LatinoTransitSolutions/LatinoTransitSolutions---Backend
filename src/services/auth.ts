import jwt from "jwt-simple"
import { User } from "../types/User"

const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "secrettoken"

const days = 7
const timestamp = days * 24 * 60 * 60 * 1000

export const createToken = (user: User | null): string | null => {
  if (user?.id) {
    const payload = {
      sub: user.id,
      iat: Date.now(),
      exp: Date.now() + timestamp
    }

    return jwt.encode(payload, TOKEN_SECRET)
  } else {
    return null
  }
}
