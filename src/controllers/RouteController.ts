import { Request, Response } from "express"
import { NewRouteType, RouteType } from "../types/Route"
import BaseResponse from "../common/BaseResponse.ts"

import IConnection from "../database/connection/IConnection.ts"
import RouteModel from "../database/models/RouteModel.ts"
import RouteService from "../services/RouteService.ts"
import CoordinateModel from "../database/models/CoordinateModel.ts"
import PointModel from "../database/models/PointModel.ts"
import Route from "../route/entities/Route.ts"
import TransportRouteModel from "../database/models/TransportRouteModel.ts"
import RoutesTypes from "../enums/RouteType.ts"
import { TransportsTypes } from "../enums/Transport.ts"

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
          const { id, name, description, startLatitude, startLongitude, endLatitude, endLongitude, distance } = val
          return RouteService.createRouteEntity(id, name, description, startLatitude, startLongitude, endLatitude, endLongitude, distance)
        })

        res.send(BaseResponse.success(newResults))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public getMyRoutes = (req: Request, res: Response) => {
    this.model
      .getCarrierRoutes(Number(req.params.idCarrier))
      .then((results: RouteType[]) => {
        const newResults: Route[] = results.map((val: RouteType) => {
          const { id, name, description, startLatitude, startLongitude, endLatitude, endLongitude, distance } = val
          return RouteService.createRouteEntity(id, name, description, startLatitude, startLongitude, endLatitude, endLongitude, distance)
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
      .then((response: RouteType) => {
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
      .then((results: RouteType[]) => {
        const newResults: Route[] = results.map((val: RouteType) => {
          const { name, description, startLatitude, startLongitude, endLatitude, endLongitude, distance } = val
          return RouteService.createRouteEntity(undefined, name, description, startLatitude, startLongitude, endLatitude, endLongitude, distance)
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

  public getAvailableRoutes = async (req: Request, res: Response) => {
    this.model
      .getWithTransports({ approved: true })
      .then((results: any[]) => {
        res.send(BaseResponse.success(results))
      })
      .catch((error: string) => {
        console.log(BaseResponse.error(error))
      })
  }

  public create = async (req: Request, res: Response) => {
    try {
      const { name, description, startLatitude, startLongitude, endLatitude, endLongitude, distance, idCarrier }: NewRouteType = req.body

      const route = RouteService.createRouteEntity(undefined, name, description, startLatitude, startLongitude, endLatitude, endLongitude, distance)

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
        endPointID: endPointId,
        distance: route.getDistance(),
        idCarrier
      })

      res.send(BaseResponse.success(null, "Route created successfully"))
    } catch (error) {
      res.send(BaseResponse.error(error))
    }
  }

  public update = (req: Request, res: Response) => {
    const { id, name, description, startLatitude, startLongitude, endLatitude, endLongitude, distance }: RouteType = req.body

    this.model
      .update({ id, name, description })
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

  public assignTransport = async (req: Request, res: Response) => {
    const { idCarrier, transport, route } = req.body

    if (route.type === RoutesTypes.LONG_ROUTE && (transport.type === TransportsTypes.WALKING || transport.type === TransportsTypes.MOTORCYCLE)) {
      res.send(BaseResponse.error("Cant register this transport on a long route"))
      return
    }

    const trasportRouteModel = new TransportRouteModel(this.connection)

    trasportRouteModel
      .create({ idCarrier, idTransport: transport.id, idRoute: route.id })
      .then(() => {
        res.send(BaseResponse.success(null, "Transport assigned to route successfully"))
      })
      .catch((error: string) => {
        res.send(BaseResponse.error(error))
      })
  }
}

export default RouteController
