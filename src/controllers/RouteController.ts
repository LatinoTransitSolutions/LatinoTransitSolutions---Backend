import { Request, Response } from "express"
import { NewRouteType, RouteType } from "../types/Route"
import BaseResponse from "../common/BaseResponse.ts"

import IConnection from "../database/connection/IConnection.ts"
import RouteModel from "../database/models/RouteModel.ts"
import RouteService from "../services/RouteService.ts"
import CoordinateModel from "../database/models/CoordinateModel.ts"
import PointModel from "../database/models/PointModel.ts"
import Route from "../route/entities/Route.ts"

class RouteController {
  private model: RouteModel
  private connection: IConnection

  constructor(_connection: IConnection) {
    this.connection = _connection
    this.model = new RouteModel(this.connection)
  }

  public getAll = (req: Request, res: Response) => {
    this.model
      .getAll()
      .then((results: RouteType[]) => {
        const newResults: Route[] = results.map((val: RouteType) => {
          const { id, name, description, price, startLatitude, startLongitude, endLatitude, endLongitude } = val
          return RouteService.createRouteEntity(id, name, description, price, startLatitude, startLongitude, endLatitude, endLongitude)
        })

        res.send(BaseResponse.success(newResults))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public getById = (req: Request, res: Response) => {
    this.model
      .getById(req.body.id)
      .then((response: RouteType) => {
        res.send(BaseResponse.success(response))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public getByColumn = (req: Request, res: Response) => {
    this.model
      .getByColumn(req.body)
      .then((results: RouteType[]) => {
        const newResults: Route[] = results.map((val: RouteType) => {
          const { name, description, price, startLatitude, startLongitude, endLatitude, endLongitude } = val
          return RouteService.createRouteEntity(undefined, name, description, price, startLatitude, startLongitude, endLatitude, endLongitude)
        })

        res.send(BaseResponse.success(newResults))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public getPendingRoutes = async (req: Request, res: Response) => {
    this.model
      .getWithTransports({ approved: false })
      .then((results: any[]) => {
        res.send(BaseResponse.success(results))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public create = async (req: Request, res: Response) => {
    try {
      const { name, description, price, startLatitude, startLongitude, endLatitude, endLongitude }: NewRouteType = req.body

      const route = RouteService.createRouteEntity(undefined, name, description, price, startLatitude, startLongitude, endLatitude, endLongitude)

      if (!route) {
        return res.send(BaseResponse.error("Unexpected route type"))
      }

      const coordinateModel = new CoordinateModel(this.connection)
      const pointModel = new PointModel(this.connection)

      const startCoordinate = RouteService.getCoordinate(startLatitude, startLongitude)
      const endCoordinate = RouteService.getCoordinate(endLatitude, endLongitude)

      const [startResponse, endResponse]: any[] = await Promise.all([coordinateModel.create(startCoordinate), coordinateModel.create(endCoordinate)])

      const startCoordinateId = Number(startResponse.insertId)
      const endCoordinateId = Number(endResponse.insertId)

      const startPoint = { name: route.getStartPoint().getName(), coordinateID: startCoordinateId }
      const endPoint = { name: route.getEndPoint().getName(), coordinateID: endCoordinateId }

      const [startPointResponse, endPointResponse]: any[] = await Promise.all([pointModel.create(startPoint), pointModel.create(endPoint)])

      const startPointId = Number(startPointResponse.insertId)
      const endPointId = Number(endPointResponse.insertId)

      await this.model.create({
        name: route.getName(),
        description: route.getDescription(),
        type: route.getType(),
        price: route.getPrice(),
        approved: route.getApproved(),
        startPointID: startPointId,
        endPointID: endPointId
      })

      res.send(BaseResponse.success(null, "Route created successfully"))
    } catch (error) {
      res.send(BaseResponse.error(error))
    }
  }

  public update = (req: Request, res: Response) => {
    const { id, name, description, price, startLatitude, startLongitude, endLatitude, endLongitude }: RouteType = req.body

    this.model
      .update({ id, name, description, price, startLatitude, startLongitude, endLatitude, endLongitude })
      .then(() => {
        res.send(BaseResponse.success(null, "Route updated successfully"))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public approveRoute = (req: Request, res: Response) => {
    const { id }: RouteType = req.body

    this.model
      .update({ id, approved: true })
      .then(() => {
        res.send(BaseResponse.success(null, "Route approved successfully"))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public delete = (req: Request, res: Response) => {
    const { id }: RouteType = req.body

    this.model
      .delete(id)
      .then(() => {
        res.send(BaseResponse.success(null, "Route deleted successfully"))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }
}

export default RouteController
