import { Request, Response } from "express"
import jwt from "jwt-simple"
import BaseResponse from "../common/BaseResponse.ts"

const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "secrettoken"

export default (req: Request, res: Response, next: () => void): Response | void => {
  if (!req.headers.authorization) {
    return res.status(401).send(BaseResponse.error("No authenticated"))
  }

  // Bearer _token => split(" ") => ["Bearer", "_token"]
  const token = req.headers.authorization.split(" ")[1]
  const payload = jwt.decode(token, TOKEN_SECRET)

  if (payload.exp <= Date.now()) {
    return res.status(401).send(BaseResponse.error("Token has expired"))
  }

  next()
}
