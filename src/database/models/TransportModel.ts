import ITransportPlate from "../../transport/product/ITransportPlate.ts"
import ITransport from "../../transport/product/ITransport.ts"
import { TransportType } from "../../types/Transport"

import IConnection from "../connection/IConnection.ts"
import BaseModel from "./BaseModel.ts"
import IModel from "./IModel.ts"

class TransportModel extends BaseModel implements IModel {
  private connection: IConnection

  constructor(_connection: IConnection) {
    super()
    this.connection = _connection
  }

  public getAll(): Promise<TransportType[] | string> {
    return new Promise((resolve, reject) => {
      this.connection
        .execute("SELECT * FROM transport")
        .then((results: TransportType[]) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public getById(_id: number): Promise<TransportType | string> {
    return new Promise((resolve, reject) => {
      this.connection
        .execute(`SELECT * FROM transport WHERE id = ?`, [_id])
        .then(([result]: TransportType[]) => {
          resolve(result)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public getByColumn(_target: object): Promise<TransportType[] | string> {
    const column = this.getColumns(_target)[0]
    const value = this.getValues(_target)[0]

    return new Promise((resolve, reject) => {
      this.connection
        .execute(`SELECT * FROM transport WHERE ${column} = ?`, [value])
        .then((results: TransportType[]) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public create(_values: ITransport | ITransportPlate): Promise<object | string> {
    const [query, values] = this.getInsertQuery(_values, "transport")

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

  public async update(_values: TransportType): Promise<object | string> {
    return new Promise((resolve, reject) => {
      this.getById(_values.id)
        .then((exists) => {
          if (exists) {
            const [query, values] = this.getUpdateQuery(_values, "transport")

            this.connection
              .execute(query, values)
              .then((results: object) => {
                resolve(results)
              })
              .catch((error: string) => {
                reject(error)
              })
          } else {
            reject("Transport does not exists")
          }
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public delete(_id: number): Promise<object | string> {
    return new Promise((resolve, reject) => {
      this.connection
        .execute("DELETE FROM transport WHERE id = ?", [_id])
        .then((results: object) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }
}

export default TransportModel
