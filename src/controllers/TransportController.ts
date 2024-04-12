import { Request, Response } from "express"
import { NewTransportType, TransportType } from "../types/Transport"
import BaseResponse from "../common/BaseResponse.ts"

import IConnection from "../database/connection/IConnection.ts"
import TransportModel from "../database/models/TransportModel.ts"
import ITransportPlate from "../transport/product/ITransportPlate.ts"
import ITransport from "../transport/product/ITransport.ts"
import TransportService from "../services/TransportService.ts"

class TransportController {
  private model: TransportModel

  constructor(_connection: IConnection) {
    this.model = new TransportModel(_connection)
  }

  public getAll = (req: Request, res: Response) => {
    this.model
      .getAll()
      .then((results: TransportType[]) => {
        const newResults: (ITransport | ITransportPlate)[] = results.map((val: TransportType) => {
          const { id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate } = val
          return TransportService.createTransportEntity(id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate)
        })

        res.send(BaseResponse.success(newResults))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }

  public getMyTransports = (req: Request, res: Response) => {
    this.model
      .getCarrierTransports(Number(req.params.idCarrier))
      .then((results: TransportType[]) => {
        const newResults: (ITransport | ITransportPlate)[] = results.map((val: TransportType) => {
          const { id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate } = val
          return TransportService.createTransportEntity(id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate)
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
      .then((response: TransportType) => {
        res.send(BaseResponse.success(response))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }

  public getByColumn = (req: Request, res: Response) => {
    const { column, value } = req.params

    this.model
      .getByColumn({ [column]: value })
      .then((results: TransportType[]) => {
        const newResults: (ITransport | ITransportPlate)[] = results.map((val: TransportType) => {
          const { id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate } = val
          return TransportService.createTransportEntity(id, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate)
        })

        res.send(BaseResponse.success(newResults))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }

  public create = (req: Request, res: Response) => {
    const { type, name, maxWidth, maxHeight, maxLength, maxWeight, plate, idCarrier }: NewTransportType = req.body

    const transport = TransportService.createTransportEntity(undefined, type, name, maxWidth, maxHeight, maxLength, maxWeight, plate)

    if (transport) {
      this.model
        .create({ ...transport, idCarrier })
        .then(() => {
          res.send(BaseResponse.success(null, "Transport created successfully"))
        })
        .catch((error: string) => {
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
      .then(() => {
        res.send(BaseResponse.success(null, "Transport updated successfully"))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }

  public delete = (req: Request, res: Response) => {
    const { id }: TransportType = req.body

    this.model
      .delete(id)
      .then(() => {
        res.send(BaseResponse.success(null, "Transport deleted successfully"))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }
}

export default TransportController
