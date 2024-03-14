import { CoordinateType } from "../../types/Coordinate";
import Connection from "../connection/ConnectionInterface.ts"
import BaseModel from "./BaseModel.ts";
import Model from "../models/ModelInterface.ts"



class CoordinateModel extends BaseModel implements Model{
    connection: Connection

    constructor(_connection: Connection){
        super()
        this.connection = _connection
    }

    public getAll(): Promise<CoordinateType[] | string> {
        return new Promise((resolve, reject) => {
            this.connection
              .execute("SELECT * FROM coordinate")
              .then((results: CoordinateType[]) => {
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
              .execute(`SELECT * FROM coordinate WHERE id`, [_id])
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
              .execute(`SELECT * FROM coordinate WHERE ${column} = ? LIMIT = 1`, [value])
              .then((results: any[]) => {
                 resolve(results)
              })
              .catch((error: string) =>{
                 reject(error)
              })
        })
    }

    public create(_values: any[]): Promise<object | string> {
      const [query, values] = this.getInsertQuery(_values, "coordinate");
  
      console.log([query, values]);
  
      return new Promise((resolve, reject) => {
          this.connection
          .execute(query, values, "batch")
          .then((results: object) => {
            console.log("results: " + results)
                  if (Array.isArray(results)) {
                    const insertIds = results.map(result => result.insertId);
                      resolve(insertIds);
                  } else {
                      reject("Error: results is not an array");
                  }
              })
              .catch((error: string) => {
                  reject(error);
              });
      });
  }

    public update(_values: object): Promise<object | string> {
        const [query, values] = this.getUpdateQuery(_values, "coordinate")

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
            .execute(`DELETE FROM coordinate WHERE id = ?`, [_id])
            .then((results: object) => {
              resolve(results)
            })
            .catch((error: string) => {
              reject(error)
            })
      })
    }


}

export default CoordinateModel