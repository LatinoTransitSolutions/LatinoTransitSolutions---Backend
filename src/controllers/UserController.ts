import { Request, Response } from "express"
import BaseResponse from "../common/BaseResponse.ts"

import Connection from "../database/connection/ConnectionInterface"
import Model from "../database/models/ModelInterface"
import UserModel from "../database/models/UserModel"
import UserService from "../services/UserService.ts"
import { NewUserType } from "../types/User"

class UserController {
  private model: Model

  constructor(_connection: Connection) {
    this.model = new UserModel(_connection)
  }

  public getAll = (req: Request, res: Response) => {
  this.model
    .getAll()
    .then((results) => {
      results = results.map((val: NewUserType) => {
        const { id, name, role, email, password, company }: NewUserType = val
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

  public getOne = (req: Request, res: Response) => {
    this.model
      .getOne(req.body)
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

    if ( user ) {
      this.model
        .create(user)
        .then((response) => {
          res.send(BaseResponse.success(null, "user created successfully"))
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
    const { id, name, role, email, password, company }: NewUserType = req.body

    this.model
      .update({ id, name, role, email, password, company })
      .then((response) => {
        res.send(BaseResponse.success(null, "user updated successfully"))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }

  public delete = (req: Request, res: Response) => {
    const { id }: NewUserType = req.body

    this.model
      .delete(id)
      .then((response) => {
        res.send(BaseResponse.success(null, "user deleted successfully"))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }
}

export default UserController
