import { Request, Response } from "express"
import CityModel from "../database/models/CityModel.ts"
import Connection from "../database/connection/ConnectionInterface.ts"
import Model from "../database/models/ModelInterface.ts"
import BaseResponse from "../common/BaseResponse.ts"

/**
 * Este controlador permite recibir una clase tipo "Connection"
 * la cual vamos a pasarla inmediatamente a una instancia del modelo
 * "CityModel" y guardala en un atributo llamado model el cual se utilizará
 * para hacer las peticiones a la base de datos:
 * getAll, getById, getOne, create, update, delete
 */
class CityController {
  model: Model

  constructor(_connection: Connection) {
    this.model = new CityModel(_connection)
  }

  /**
   * Permite ejecutar la función getAll del modelo el cual
   * retorna una promesa y lo que venga en el then se hace
   * res.send() para eviarla al emisor con un estado success
   * si llega a caer en el catch se devuelve el error con
   * un estado de error
   *
   * BaseResponse es una clase que permite estandarizar la
   * respuesta que va llegar al emisor
   *
   * Nota: Fijarse que estos métodos son de tipo
   * arrow functions y esto está hecho a propósito para
   * que en el enrutador no haya problemas con pasar la
   * función de esta forma: --- controller.getAll ---
   */
  public getAll = (req: Request, res: Response) => {
    this.model
      .getAll()
      .then((results) => {
        res.send(BaseResponse.success(results))
      })
      .catch((error) => {
        res.send(BaseResponse.error(error))
      })
  }

  public getById = (req: Request, res: Response) => {
    this.model.getById(req.body.id)
  }

  public getOne = (req: Request, res: Response) => {
    this.model.getOne(req.body.target)
  }

  public create = (req: Request, res: Response) => {
    this.model.create({})
  }

  public update = (req: Request, res: Response) => {
    this.model.update({})
  }

  public delete = (req: Request, res: Response) => {
    this.model.delete(0)
  }
}

export default CityController
