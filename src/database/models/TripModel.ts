import { TripType, NewTripType } from "../../types/Trip";

import IConnection from "../connection/IConnection";
import BaseModel from "./BaseModel";
import IModel from "./IModel";

class TripModel extends BaseModel implements IModel {
  connection: IConnection

  constructor(_connection: IConnection) {
    super()
    this.connection = _connection
  }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection
        .execute("SELECT * FROM trip")
        .then((results: TripType[]) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  getById(_id: number): Promise<TripType | string> {
    return new Promise((resolve, reject) => {
      this.connection
        .execute(`SELECT * FROM trip WHERE id = ?`, [_id])
        .then(([result]: TripType[]) => {
          resolve(result)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  getByColumn(_target: object): Promise<TripType[]> {
    const column = this.getColumns(_target)[0]
    const value = this.getValues(_target)[0]

    return new Promise((resolve, reject) => {
      this.connection
        .execute(`SELECT * FROM trip WHERE ${column} = ?`, [value])
        .then((results: TripType[]) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  create(_values: TripType): Promise<object | string> {
    const [query, values] = this.getInsertQuery(_values, "trip")

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

  update(_values: TripType): Promise<object | string> {
    return new Promise((resolve, reject) => {
      this.getById(_values.id)
        .then((exists) => {
          if (exists) {
            const [query, values] = this.getUpdateQuery(_values, "trip")

            this.connection
              .execute(query, values)
              .then((results: object) => {
                resolve(results)
              })
              .catch((error: string) => {
                reject(error)
              })
          } else {
            reject("Trip does not exist")
          }
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  delete(_id: number): Promise<object | string> {
    return new Promise((resolve, reject) => {
      this.getById(_id)
        .then((exists) => {
          if (exists) {
            this.connection
              .execute(`DELETE FROM trip WHERE id = ?`, [_id])
              .then((results: object) => {
                resolve(results)
              })
              .catch((error: string) => {
                reject(error)
              })
          } else {
            reject("Trip does not exists")
          }
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }
}

export default TripModel