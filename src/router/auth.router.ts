import { Request, Response, Router } from "express"
import { createToken } from "../utils/auth.ts"
import BaseResponse from "../common/BaseResponse.ts"
import UserModel from "../database/models/UserModel.ts"
import MariaDBConnection from "../database/connection/MariaDBConnection.ts"
import { UserType } from "../types/User"

const router: Router = Router()

const model = new UserModel(MariaDBConnection.getInstance())

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body

  model.getByColumn({ email }).then(([userFound]: UserType[]) => {
    if (userFound && userFound.password === password) {
      res.send(BaseResponse.success({ token: createToken(userFound) }))
    } else {
      res.send(BaseResponse.error("User not found"))
    }
  })
})

export default router
