import { UserType } from "../../types/User"
import UserInterface from "../../user/interface/UserInterface.ts"
import Permission from "../../user/interface/Permission.ts"

import Connection from "../connection/ConnectionInterface.ts"
import BaseModel from "./BaseModel"
import ModelInterface from "./ModelInterface"


class UserModel extends BaseModel implements ModelInterface {
    private connection: Connection

    constructor(_connection: Connection) {
        super()
        this.connection = _connection
    }
    
    public getAll(): Promise<UserType[] | string> {
        return new Promise((resolve, reject) => {
            this.connection
                .execute(`SELECT * FROM user`)
                .then((resulte: UserType[]) => {
                    resolve(resulte)
                })
                .catch((error: string) => {
                    reject(error)
                })
        })
    }

    public getById(_id: number): Promise<any[] | string> {
        return new Promise((resolve, reject) => {
            this.connection
                .execute(`SELECT * FROM user WHERE id = ?`, [_id])
                .then((results: any[]) => {
                    resolve(results)
                })
                .catch((error: string) => {{
                    reject(error)
                }})
        })
    }

    public getOne(_target: object): Promise<any[] | string> {
        const column = this.getColumns(_target)[0]
        const value = this.getValues(_target)[0]
    
        return new Promise((resolve, reject) => {
          this.connection
            .execute(`SELECT * FROM user WHERE ${column} = ? LIMIT 1`, [value])
            .then((results: any[]) => {
              resolve(results)
            })
            .catch((error: string) => {
              reject(error)
            })
        })
      }

    public create(_values: object): Promise<object | string> {
        const [query, values] = this.getInsertQuery(_values)

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
    
    public update(_values: UserInterface | Permission): Promise<object | string> {
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
                .execute("DELETE FROM user WHERE id = ?", [_id])
                .then((results: object) => {
                    resolve(results)
                })
                .catch((error: string) => {
                    reject(error)
                })
        })
    }
}

export default UserModel