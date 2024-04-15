import { Request, Response } from "express"
import { NewTripType, TripType } from "../types/Trip"
import BaseResponse from "../common/BaseResponse"

import IConnection from "../database/connection/IConnection"
import TripService from "../services/TripService"
import TripModel from "../database/models/TripModel"
import { TransportType, NewTransportType } from "../types/Transport"

class TripController {
    private model: TripModel
    private connection: IConnection

    constructor(_connection: IConnection) {
        this.connection = _connection
        this.model = new TripModel(this.connection)
    }

    public getAll = (req: Request, res: Response) => {
       /** this.model
          .getAll()
          .then((results: TripType[]) => {
            const newResults: any[] = results.map((val: TripType) => {
              const { id, name, description, price, width, height, length, weight } = val
              return TripService.createPackageEntity(id, name, description, price, width, height, length, weight)
            })
    
            res.send(BaseResponse.success(newResults))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          }) */
      }

      public getMyPackages = (req: Request, res: Response) => {
        /**this.model
          .getUserPackages(Number(req.params.idUser))
          .then((results: PackageType[]) => {
            const newResults: IPackage[] = results.map((val: PackageType) => {
              const { id, name, description, price, width, height, length, weight } = val
              return TripService.createPackageEntity(id, name, description, price, width, height, length, weight)
            })
    
            res.send(BaseResponse.success(newResults))
          })
          .catch((error: string) => {
            res.send(BaseResponse.error(error))
          }) */
      }
    
    
      public getById = (req: Request, res: Response) => {
       /** this.model
          .getById(Number(req.params.id))
          .then((response: PackageType) => {
            res.send(BaseResponse.success(response))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          }) */
      }
    
      public getByColumn = (req: Request, res: Response) => {
       /**
        *  const { column, value } = req.params

        this.model
          .getByColumn({ [column]: value })
          .then((results: PackageType[]) => {
            const newResults: IPackage[] = results.map((val: PackageType) => {
                const { id, name, description, price, width, height, length, weight } = val
              return TripService.createPackageEntity(id, name, description, price, width, height, length, weight)
            })
    
            res.send(BaseResponse.success(newResults))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          })
        */
      }

      public getAvailableTransports = async (req: Request, res: Response) => {
        this.model
          .getAvailableTransports({ available: true })
          .then((results: NewTransportType[]) => {
            res.send(BaseResponse.success(results))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          })
      }
    
      public create = (req: Request, res: Response) => {
        /**
         * const { name, description, price, width, height, length, weight, idUser }: NewTripType = req.body
    
        const packageEntity = TripService.createPackageEntity(undefined, name, description, price, width, height, length, weight )
        if (packageEntity) {
          this.model
            .create({ ...packageEntity, idUser })
            .then(() => {
              res.send(BaseResponse.success(null, "Package created successfully"))
            })
            .catch((error: string) => {
              res.send(BaseResponse.error(error))
            })
        } else {
          res.send(BaseResponse.error("Unexpected package type"))
        }
         */
      }
    
      public update = (req: Request, res: Response) => {
        /**const { id, name, description, price, width, height, length, weight }: PackageType = req.body
    
        this.model
          .update({ id, name, description, price, width, height, length, weight })
          .then(() => {
            res.send(BaseResponse.success(null, "Package updated successfully"))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          }) */
      }
    
      public delete = (req: Request, res: Response) => {
        /**const { id }: PackageType = req.body
    
        this.model
          .delete(id)
          .then(() => {
            res.send(BaseResponse.success(null, "Package deleted successfully"))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          }) */
      }

}

export default TripController