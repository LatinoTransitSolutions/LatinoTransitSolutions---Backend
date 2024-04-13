import { CreateRouteType, RouteType } from "../../types/Route"
import IConnection from "../connection/IConnection.ts"
import BaseModel from "./BaseModel.ts"
import IModel from "../models/IModel.ts"

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
        .execute(`SELECT * FROM view_routes ${where}`)
        .then((results: RouteType[]) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public getCarrierRoutes(_idCarrier: number): Promise<RouteType[] | string> {
    return new Promise((resolve, reject) => {
      this.connection
        .execute(`SELECT * FROM view_routes WHERE idCarrier = ${_idCarrier}`)
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

  public getWithTransports(_target?: object): Promise<RouteType[] | string> {
    const column = this.getColumns(_target)[0]
    const value = this.getValues(_target)[0]

    const where = column ? `WHERE ${column} = ${value}` : ""

    return new Promise((resolve, reject) => {
      this.connection
        .execute(`SELECT * FROM view_routes_with_transports ${where};`)
        .then((results: RouteType[]) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public create(_values: CreateRouteType): Promise<object | string> {
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

  public update(_values: any): Promise<object | string> {
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
