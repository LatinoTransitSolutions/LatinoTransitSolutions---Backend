import { Request, Response } from "express"
import Connection from "../database/connection/ConnectionInterface.ts"
import Model from "../database/models/ModelInterface.ts"
import TransportModel from "../database/models/TransportModel.ts"
import BaseResponse from "../common/BaseResponse.ts"
import { NewTransport, Transport } from "../types/Transport"

class TransportController {
  model: Model

  constructor(_connection: Connection) {
    this.model = new TransportModel(_connection)
  }

  public getAll = (req: Request, res: Response) => {
    this.model
      .getAll()
      .then((results) => {
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
    const { type, name, max_width, max_height, max_length, max_weight }: NewTransport = req.body

    this.model
      .create({ type, name, max_width, max_height, max_length, max_weight })
      .then((response) => {
        res.send(BaseResponse.success(null, "Transport created successfully"))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }

  public update = (req: Request, res: Response) => {
    const { id, type, name, max_width, max_height, max_length, max_weight }: Transport = req.body

    this.model
      .update({ id, type, name, max_width, max_height, max_length, max_weight })
      .then((response) => {
        res.send(BaseResponse.success(null, "Transport updated successfully"))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }

  public delete = (req: Request, res: Response) => {
    const { id }: Transport = req.body

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

export default TransportController
