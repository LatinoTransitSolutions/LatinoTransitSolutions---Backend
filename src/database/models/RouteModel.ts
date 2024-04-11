import { RouteType } from "../../types/Route"
import IConnection from "../connection/IConnection.ts"
import BaseModel from "./BaseModel.ts"
import IModel from "../models/IModel.ts"
import Route from "../../route/entities/Route.ts"

class RouteModel extends BaseModel implements IModel {
  connection: IConnection

  constructor(_connection: IConnection) {
    super()
    this.connection = _connection
  }

  public getAll(_column?: string, _value?: any): Promise<RouteType[] | string> {
    const where = _column ? `WHERE ${_column} = ${_value}` : ""

    return new Promise((resolve, reject) => {
      this.connection
        .execute(
          `
            SELECT 
            route.id,
            route.name,
            route.description,
            route.type,
            route.price,
            route.approved,
            spoint.name as startPointName,
            epoint.name as endPointName,
            scoord.latitude as startLatitude,
            scoord.longitude as startLongitude,
            ecoord.latitude as endLatitude,
            ecoord.longitude as endLongitude
            FROM route
            INNER JOIN point as spoint ON spoint.id = route.startPointID
            INNER JOIN point as epoint ON epoint.id = route.endPointID
            INNER JOIN coordinate as scoord ON scoord.id = spoint.coordinateID
            INNER JOIN coordinate as ecoord ON ecoord.id = epoint.coordinateID
            ${where}
          `
        )
        .then((results: RouteType[]) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public getById(_id: number): Promise<RouteType | string> {
    return new Promise((resolve, reject) => {
      this.connection
        .execute(`SELECT * FROM route WHERE id`, [_id])
        .then(([result]: RouteType[]) => {
          resolve(result)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public getByColumn(_target: object): Promise<RouteType[] | string> {
    const column = this.getColumns(_target)[0]
    const value = this.getValues(_target)[0]

    return new Promise((resolve, reject) => {
      this.getAll(column, value)
        .then((results: RouteType[]) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public create(_values: Route): Promise<object | string> {
    const [query, values] = this.getInsertQuery(_values, "route")

    return new Promise((resolve, reject) => {
      this.connection
        .execute(query, values)
        .then((results: object) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public update(_values: RouteType): Promise<object | string> {
    return new Promise((resolve, reject) => {
      this.getById(_values.id)
        .then((exists) => {
          if (exists) {
            const [query, values] = this.getUpdateQuery(_values, "route")

            this.connection
              .execute(query, values)
              .then((results: object) => {
                resolve(results)
              })
              .catch((error: string) => {
                reject(error)
              })
          } else {
            reject("Route does not exists")
          }
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public delete(_id: number): Promise<object | string> {
    return new Promise((resolve, reject) => {
      this.getById(_id)
        .then((exists) => {
          if (exists) {
            this.connection
              .execute(`DELETE FROM route WHERE id = ?`, [_id])
              .then((results: object) => {
                resolve(results)
              })
              .catch((error: string) => {
                reject(error)
              })
          } else {
            reject("Route does not exists")
          }
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }
}

export default RouteModel
