import { Request, Response } from "express"
import { TripType } from "../types/Trip"
import BaseResponse from "../common/BaseResponse"

import IConnection from "../database/connection/IConnection"
import TripService from "../services/TripService"
import TripModel from "../database/models/TripModel"

class TripController {
  private model: TripModel
  private connection: IConnection

  constructor(_connection: IConnection) {
    this.connection = _connection
    this.model = new TripModel(this.connection)
  }

  public getAll = (req: Request, res: Response) => {
    this.model
      .getAll()
      .then((results: TripType[]) => {
        const newResults: any[] = results.map((val: TripType) => {
          const { id, idClient, idPackage, idTransportRoute } = val
          return TripService.createTripEntity(id, idClient, idPackage, idTransportRoute)
        })
        res.send(BaseResponse.success(newResults))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public getById = (req: Request, res: Response) => {
    this.model
      .getById(Number(req.params.id))
      .then((response: TripType) => {
        res.send(BaseResponse.success(response))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public getByColumn = (req: Request, res: Response) => {
    const { column, value } = req.params

    this.model
      .getByColumn({ [column]: value })
      .then((results: TripType[]) => {
        const newResults: TripType[] = results.map((val: TripType) => {
          const { id, idClient, idPackage, idTransportRoute } = val
          return TripService.createTripEntity(id, idClient, idPackage, idTransportRoute)
        })

        res.send(BaseResponse.success(newResults))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public create = (req: Request, res: Response) => {
    const { idClient, idTransportRoute, package: packageEntity, transport } = req.body

    const canHandlePackage = TripService.canHandlePackage(packageEntity, transport)
    if (canHandlePackage) {
      this.model
        .create({ idClient, idPackage: packageEntity.id, idTransportRoute })
        .then(() => {
          res.send(BaseResponse.success(null, "Trip created successfully"))
        })
        .catch((error: string) => {
          res.send(BaseResponse.error(error))
        })
    } else {
      res.send(BaseResponse.error("Package can not be handle for this transport"))
    }
  }

  public update = (req: Request, res: Response) => {
    const { id, idClient, idPackage, idTransportRoute }: TripType = req.body

    this.model
      .update({ id, idClient, idPackage, idTransportRoute })
      .then(() => {
        res.send(BaseResponse.success(null, "Trip updated successfully"))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public delete = (req: Request, res: Response) => {
    const { id }: TripType = req.body

    this.model
      .delete(id)
      .then(() => {
        res.send(BaseResponse.success(null, "Trip deleted successfully"))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

}

export default TripController