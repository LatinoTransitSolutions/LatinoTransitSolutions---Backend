import { Request, Response } from "express"
import { UserType, NewUserType } from "../types/User"
import BaseResponse from "../common/BaseResponse.ts"

import IConnection from "../database/connection/IConnection"
import IModel from "../database/models/IModel"
import UserModel from "../database/models/UserModel"
import UserService from "../services/UserService.ts"
import IUser from "../user/interface/IUser.ts"
import { createToken } from "../utils/auth.ts"

class UserController {
  private model: IModel

  constructor(_connection: IConnection) {
    this.model = new UserModel(_connection)
  }

  public getAll = (req: Request, res: Response) => {
    this.model
      .getAll()
      .then((results) => {
        const newResults: IUser = results.map((val: UserType) => {
          const { id, name, role, email, password, company } = val
          return UserService.createUser(id, name, role, email, password, company)
        })

        res.send(BaseResponse.success(newResults))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }

  public getById = (req: Request, res: Response) => {
    this.model
      .getById(Number(req.params.id))
      .then((response: IUser) => {
        res.send(BaseResponse.success(response))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }

  public getByColumn = (req: Request, res: Response) => {
    this.model
      .getByColumn(req.body)
      .then((results) => {
        const newResults: IUser = results.map((val: UserType) => {
          const { id, name, role, email, password, company } = val
          return UserService.createUser(id, name, role, email, password, company)
        })

        res.send(BaseResponse.success(newResults))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }

  public create = (req: Request, res: Response) => {
    const { name, role, email, password, company }: NewUserType = req.body

    const user = UserService.createUser(undefined, name, role, email, password, company)

    if (user) {
      this.model
        .create(user)
        .then(({ insertId }) => {
          const savedUser = { ...user, id: Number(insertId) }
          res.send(BaseResponse.success({ token: createToken(savedUser), user: savedUser }, "User created successfully"))
        })
        .catch((error: string) => {
          console.log(error)
          res.send(BaseResponse.error(error))
        })
    } else {
      res.send(BaseResponse.error("Unexpected user type"))
    }
  }

  public update = (req: Request, res: Response) => {
    const { id, name, role, email, password, company }: UserType = req.body

    this.model
      .update({ id, name, role, email, password, company })
      .then(() => {
        res.send(BaseResponse.success(null, "User updated successfully"))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }

  public delete = (req: Request, res: Response) => {
    const { id }: UserType = req.body

    this.model
      .delete(id)
      .then(() => {
        res.send(BaseResponse.success(null, "User deleted successfully"))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }

  public login = (req: Request, res: Response) => {
    const { email, password }: NewUserType = req.body

    this.model.getByColumn({ email }).then(([userFound]: UserType[]) => {
      if (userFound && userFound.password === password) {
        res.send(BaseResponse.success({ token: createToken(userFound), user: userFound }))
      } else {
        res.send(BaseResponse.error("User not found"))
      }
    })
  }
}

export default UserController
