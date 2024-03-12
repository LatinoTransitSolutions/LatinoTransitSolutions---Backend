import { Request, Response, Router } from "express"
import { createToken } from "../utils/auth.ts"
import BaseResponse from "../common/BaseResponse.ts"

const router: Router = Router()

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body
  const userInDB = { id: "12345678", username: "admin", password: "password" }
  const userFound = username === userInDB.username && password === userInDB.password ? userInDB : null

  if (userFound) {
    res.send(BaseResponse.success({ token: createToken(userFound) }))
  } else {
    res.send(BaseResponse.error("User not found"))
  }
})

export default router
