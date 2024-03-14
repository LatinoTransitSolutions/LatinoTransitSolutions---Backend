import { Request, Response } from "express"
import { NewRouteType, RouteType } from "../types/Route"
import BaseResponse from "../common/BaseResponse.ts"

import Connection from "../database/connection/ConnectionInterface.ts"
import Model from "../database/models/ModelInterface.ts"
import RouteModel from "../database/models/RouteModel.ts"
import RouteService from "../services/RouteService.ts"
import CoordinateModel from "../database/models/CoordinateModel.ts"
import PointModel from "../database/models/PointModel.ts"

class RouteController {
    private model: Model
    private connection: Connection

    constructor(_connection: Connection){
      this.connection = _connection
      this.model = new RouteModel(this.connection)
    }

    public getAll = (req: Request, res: Response) => {
        this.model
          .getAll()
          .then((results) => {
            results = results.map((val: RouteType) => {
                const {id, name, description, price, start_latitude, start_longitude, end_latitude, end_longitude}: RouteType = val
                return RouteService.createRouteEntity(id, name, description, price, start_latitude, start_longitude, end_latitude, end_longitude);
            })

            res.send(BaseResponse.success(results))
          })
          .catch((error) => {
            console.log(BaseResponse.error(error))
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
        const { name, description, price, start_latitude, start_longitude, end_latitude, end_longitude }: NewRouteType = req.body;
      
        const route = RouteService.createRouteEntity(undefined, name, description, price, start_latitude, start_longitude, end_latitude, end_longitude);
        const coordinateModel = new CoordinateModel(this.connection);
        const pointModel = new PointModel(this.connection);
      
        if (route) {
          
          const coordinates = [
             RouteService.getCoordinate(start_latitude, start_longitude),
             RouteService.getCoordinate(end_latitude, end_longitude)]

             console.log(RouteService.getCoordinate(start_latitude, start_longitude))
             console.log(RouteService.getCoordinate(end_latitude, end_longitude))
          coordinateModel
            .create(coordinates)
            .then((response: any[]) => {
              console.log("response "+response)
      
              const startCoordinateId = Number(response[0].insertId)
              console.log(startCoordinateId)
              const endCoordinateId = Number(response[1].insertId)
              console.log(startCoordinateId)
      
              const points = [
                { name: route.getStartPoint().getName(), coordinate_id: startCoordinateId },
                { name: route.getEndPoint().getName(), coordinate_id: endCoordinateId }
              ]
      
              pointModel
                .create(points)
                .then((response: any[]) => {
                  
                  const startPointId = Number(response[0].insertId);
                  const endPointId = Number(response[1].insertId);
      
                  this.model
                    .create({
                      name: route.getName(),
                      description: route.getDescription(),
                      type: route.getType(),
                      price: route.getPrice(),
                      approved: route.getApproved(),
                      status: route.getStatus(),
                      start_point_id: startPointId,
                      end_point_id: endPointId
                    })
                    .then(() => {
                      res.send(BaseResponse.success(null, "Route created successfully"));
                    });
                });
            })
            .catch((error) => {
              console.log(error);
              res.send(BaseResponse.error(error));
            });
        } else {
          res.send(BaseResponse.error("Unexpected route type"));
        }
      }
    
    
      public update = (req: Request, res: Response) => {
        const { id, name, description, price, start_latitude, start_longitude, end_latitude, end_longitude }: RouteType = req.body
    
        this.model
          .update({ id, name, description, price, start_latitude, start_longitude, end_latitude, end_longitude })
          .then((response) => {
            res.send(BaseResponse.success(null, "Route updated successfully"))
          })
          .catch((error) => {
            console.log(BaseResponse.error(error))
          })
      }
    
      public delete = (req: Request, res: Response) => {
        const { id }: RouteType = req.body
    
        this.model
          .delete(id)
          .then((response) => {
            res.send(BaseResponse.success(null, "Route deleted successfully"))
          })
          .catch((error) => {
            console.log(BaseResponse.error(error))
          })
      }
}





export default RouteController