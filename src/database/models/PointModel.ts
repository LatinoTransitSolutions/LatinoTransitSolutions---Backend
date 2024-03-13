import { PointType } from "../../types/Point.ts";
import Connection from "../connection/ConnectionInterface.ts"
import BaseModel from "./BaseModel.ts";
import Model from "../models/ModelInterface.ts"



class PointModel extends BaseModel implements Model{
    connection: Connection

    constructor(_connection: Connection){
        super()
        this.connection = _connection
    }

    public getAll(): Promise<PointType[] | string> {
        return new Promise((resolve, reject) => {
            this.connection
              .execute("SELECT * FROM point")
              .then((results: PointType[]) => {
                  resolve(results)
              })
              .catch((error: string) => {
                  reject(error)
              })
        })
    }

    public getById(_id: number): Promise<any[] | string> {
        return new Promise((resolve, reject) => {
            this.connection
              .execute(`SELECT * FROM point WHERE id`, [_id])
              .then((results: any[]) => {
                 resolve(results)
              })
              .catch((error: string) => {
                 reject(error)
              }) 
        })
    }
    
    public getOne(_target: object): Promise<any[] | string> {
        const column = this.getColumns(_target)[0]
        const value = this.getValues(_target)[0]

        return new Promise((resolve, reject) => {
            this.connection
              .execute(`SELECT * FROM point WHERE ${column} = ? LIMIT = 1`, [value])
              .then((results: any[]) => {
                 resolve(results)
              })
              .catch((error: string) =>{
                 reject(error)
              })
        })
    }

    public create(_values: object): Promise<object | string> {
        const [query, values] = this.getInsertQuery(_values, "point")

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

    public update(_values: object): Promise<object | string> {
        const [query, values] = this.getUpdateQuery(_values)

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

    public delete(_id: number): Promise<object | string> {
        return new Promise((resolve, reject) => {
          this.connection
            .execute(`DELETE FROM point WHERE id = ?`, [_id])
            .then((results: object) => {
              resolve(results)
            })
            .catch((error: string) => {
              reject(error)
            })
        })
    }
}

export default PointModel