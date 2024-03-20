import { Request, Response } from "express"
import { NewUserType, UserType } from "../types/User"
import BaseResponse from "../common/BaseResponse.ts"

import Connection from "../database/connection/ConnectionInterface"
import Model from "../database/models/ModelInterface"
import UserModel from "../database/models/UserModel"

class UserController {
  private model: Model

  constructor(_connection: Connection) {
    this.model = new UserModel(_connection)
  }

  public getAll = (req: Request, res: Response) => {
  this.model
    .getAll()
    .then((results) => {
      results = results.map((val: UserType) => {
        const { id, type, name, max_width, max_height, max_length, max_weight, plate }: UserType = val
        return TransportService.createTransportEntity(id, type, name, max_width, max_height, max_length, max_weight, plate)
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
    const { type, name, max_width, max_height, max_length, max_weight, plate }: NewUserType = req.body

    const transport = TransportService.createTransportEntity(undefined, type, name, max_width, max_height, max_length, max_weight, plate)

    if (transport) {
      this.model
        .create(transport)
        .then((response) => {
          res.send(BaseResponse.success(null, "Transport created successfully"))
        })
        .catch((error) => {
          console.log(error)
          res.send(BaseResponse.error(error))
        })
    } else {
      res.send(BaseResponse.error("Unexpected transport type"))
    }
  }

  public update = (req: Request, res: Response) => {
    const { id, type, name, max_width, max_height, max_length, max_weight, plate }: UserType = req.body

    this.model
      .update({ id, type, name, max_width, max_height, max_length, max_weight, plate })
      .then((response) => {
        res.send(BaseResponse.success(null, "Transport updated successfully"))
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
        res.send(BaseResponse.success(null, "Transport deleted successfully"))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }
}

export default UserController
