import { Request, Response } from "express"
import BaseResponse from "../common/BaseResponse.ts"

import IConnection from "../database/connection/IConnection"
import IModel from "../database/models/IModel"
import UserModel from "../database/models/UserModel"
import UserService from "../services/UserService.ts"
import { UserType, NewUserType } from "../types/User"

class UserController {
  private model: IModel

  constructor(_connection: IConnection) {
    this.model = new UserModel(_connection)
  }

  public getAll = (req: Request, res: Response) => {
    this.model
      .getAll()
      .then((results) => {
        results = results.map((val: UserType) => {
          const { id, name, role, email, password, company }: UserType = val
          return UserService.createUser(id, name, role, email, password, company)
        })

        res.send(BaseResponse.success(results))
      })
      .catch((error) => {
        res.send(BaseResponse.error(error))
      })
  }

  public getById = (req: Request, res: Response) => {
    this.model
      .getById(req.body.id)
      .then((response) => {
        res.send(BaseResponse.success(response))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }

  public getByColumn = (req: Request, res: Response) => {
    this.model
      .getByColumn(req.body)
      .then((response) => {
        res.send(BaseResponse.success(response))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }

  public create = (req: Request, res: Response) => {
    const { name, role, email, password, company }: NewUserType = req.body

    const user = UserService.createUser(undefined, name, role, email, password, company)

    if (user) {
      this.model
        .create(user)
        .then((response) => {
          res.send(BaseResponse.success(null, "User created successfully"))
        })
        .catch((error) => {
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
      .then((response) => {
        res.send(BaseResponse.success(null, "User updated successfully"))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }

  public delete = (req: Request, res: Response) => {
    const { id }: UserType = req.body

    this.model
      .delete(id)
      .then((response) => {
        res.send(BaseResponse.success(null, "User deleted successfully"))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }
}

export default UserController
