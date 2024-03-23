import { Request, Response } from "express"
import { NewTransportType, TransportType } from "../types/Transport"
import BaseResponse from "../common/BaseResponse.ts"

import Connection from "../database/connection/ConnectionInterface.ts"
import Model from "../database/models/ModelInterface.ts"
import TransportModel from "../database/models/TransportModel.ts"
import TransportService from "../services/TransportService.ts"

class TransportController {
  private model: Model

  constructor(_connection: Connection) {
    this.model = new TransportModel(_connection)
  }

  public getAll = (req: Request, res: Response) => {
    this.model
      .getAll()
      .then((results) => {
        results = results.map((val: TransportType) => {
          const { id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate }: TransportType = val
          return TransportService.createTransportEntity(id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate)
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
    const { type, name, maxWidth, maxHeight, maxLength, maxWeight, plate }: NewTransportType = req.body

    const transport = TransportService.createTransportEntity(undefined, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate)

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
    const { id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate }: TransportType = req.body

    this.model
      .update({ id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate })
      .then((response) => {
        res.send(BaseResponse.success(null, "Transport updated successfully"))
      })
      .catch((error) => {
        console.log(BaseResponse.error(error))
      })
  }

  public delete = (req: Request, res: Response) => {
    const { id }: TransportType = req.body

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
