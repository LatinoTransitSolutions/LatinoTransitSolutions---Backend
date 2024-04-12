import { Request, Response } from "express"
import { NewPackageType, PackageType } from "../types/Package"
import BaseResponse from "../common/BaseResponse"

import IConnection from "../database/connection/IConnection"
import IModel from "../database/models/IModel"
import IPackage from "../package/interfaces/IPackage"
import PackageService from "../services/PackageService"
import PackageModel from "../database/models/PackageModel"


class PackageController {
    private model: IModel
    private connection: IConnection

    constructor(_connection: IConnection) {
        this.connection = _connection
        this.model = new PackageModel(this.connection)
    }

    public getAll = (req: Request, res: Response) => {
        this.model
          .getAll()
          .then((results: PackageType[]) => {
            const newResults: IPackage[] = results.map((val: PackageType) => {
              const { id, name, description, price, width, height, length, weight } = val
              return PackageService.createPackageEntity(id, name, description, price, width, height, length, weight)
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
          .then((response: IPackage) => {
            res.send(BaseResponse.success(response))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          })
      }
    
      public getByColumn = (req: Request, res: Response) => {
        this.model
          .getByColumn(req.body)
          .then((results: PackageType[]) => {
            const newResults: IPackage[] = results.map((val: PackageType) => {
                const { id, name, description, price, width, height, length, weight } = val
              return PackageService.createPackageEntity(id, name, description, price, width, height, length, weight)
            })
    
            res.send(BaseResponse.success(newResults))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          })
      }
    
      public create = (req: Request, res: Response) => {
        const { name, description, price, width, height, length, weight }: NewPackageType = req.body
    
        const packageEntity = PackageService.createPackageEntity(undefined, name, description, price, width, height, length, weight )
    
        if (packageEntity) {
          this.model
            .create(packageEntity)
            .then(() => {
              res.send(BaseResponse.success(null, "Package created successfully"))
            })
            .catch((error: string) => {
              res.send(BaseResponse.error(error))
            })
        } else {
          res.send(BaseResponse.error("Unexpected package type"))
        }
      }
    
      public update = (req: Request, res: Response) => {
        const { id, name, description, price, width, height, length, weight }: PackageType = req.body
    
        this.model
          .update({ id, name, description, price, width, height, length, weight })
          .then(() => {
            res.send(BaseResponse.success(null, "Package updated successfully"))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          })
      }
    
      public delete = (req: Request, res: Response) => {
        const { id }: PackageType = req.body
    
        this.model
          .delete(id)
          .then(() => {
            res.send(BaseResponse.success(null, "Package deleted successfully"))
          })
          .catch((error: string) => {
            console.log(BaseResponse.error(error))
          })
      }

}

export default PackageController