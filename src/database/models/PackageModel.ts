import IPackage from "../../package/interfaces/IPackage";
import { PackageType } from "../../types/Package";
import IConnection from "../connection/IConnection";
import BaseModel from "./BaseModel";
import IModel from "./IModel";

class PackageModel extends BaseModel implements IModel {
    private connection: IConnection

    constructor(_connection: IConnection) {
        super()
        this.connection = _connection
    }

    public getAll(): Promise<PackageType[] | string> {
        return new Promise((resolve, reject) => {
            this.connection
                .execute("SELECT * FROM package")
                .then((results: PackageType[]) => {
                    resolve(results)
                })
                .catch((error: string) => {
                    reject(error)
                })
        })
    }

    public getById(_id: number): Promise<PackageType | string> {
        return new Promise((resolve, reject) => {
            this.connection
                .execute(`SELECT * FROM package WHERE id = ?`, [_id])
                .then(([result]: PackageType[]) => {
                    resolve(result)
                })
                .catch((error: string) => {
                    reject(error)
                })
        })
    }

    public getByColumn(_target: object): Promise<PackageType[] | string> {
        const column = this.getColumns(_target)[0]
        const value = this.getValues(_target)[0]

        return new Promise((resolve, reject) => {
            this.connection
                .execute(`SELECT * FROM package WHERE ${column} = ?`, [value])
                .then((results: PackageType[]) => {
                    resolve(results)
                })
                .catch((error: string) => {
                    reject(error)
                })
        })
    }

    public create(_values: IPackage): Promise<object | string> {
        const [query, values] = this.getInsertQuery(_values, "package")

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

    public async update(_values: PackageType): Promise<object | string> {
        return new Promise((resolve, reject) => {
            this.getById(_values.id)
                .then((exists) => {
                    if (exists) {
                        const [query, values] = this.getUpdateQuery(_values, "package")

                        this.connection
                            .execute(query, values)
                            .then((results: object) => {
                                resolve(results)
                            })
                            .catch((error: string) => {
                                reject(error)
                            })
                    } else {
                        reject("Package does not exists")
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
                            .execute(`DELETE FROM package WHERE id = ?`, [_id])
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
}

export default PackageModel