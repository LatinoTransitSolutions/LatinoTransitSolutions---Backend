import { Request, Response, Router } from "express"
import { PoolConnection, SqlError } from "mariadb"
import db from "../database/db.ts"
import authMiddleware from "../middleware/auth.ts"

import BaseResponse from "../common/BaseResponse.ts"
import MariaDBConnection from "../database/connection/MariaDBConnection.ts"
import CityModel from "../database/models/CityModel.ts"
import CityController from "../controllers/CityController.ts"

const router: Router = Router()

/**
 * Endpoint que responde con un objeto: { message: "Welcome" }
 */
router.route("/").get((_req: Request, res: Response) => {
  res.send({ message: "Welcome" })
})

/**
 * Endpoint que implenta la forma que hay en la documentación de mariadb
 */
router.route("/all1").get((req: Request, res: Response) => {
  db.getConnection()
    .then((connection: PoolConnection) => {
      connection
        .query("SELECT * FROM city LIMIT 10")
        .then((rows: Array<unknown>) => {
          res.send(BaseResponse.success(rows))
          connection.release()
        })
        .catch((error: SqlError) => {
          console.error("Error executing query:", error)
          res.send(BaseResponse.error())
        })
    })
    .catch((error: SqlError) => {
      console.error("Error connecting db:", error)
      res.send(BaseResponse.error())
    })
})

/**
 * Endpoint que implementa una clase Connection con un método estático
 * llamado "execute" el cual retorna una promesa
 */
router.route("/all2").get((req: Request, res: Response) => {
  const conn = new MariaDBConnection()
  conn
    .execute("SELECT * FROM city LIMIT 10")
    .then((results: unknown) => {
      res.send(BaseResponse.success(results))
    })
    .catch((error: string) => {
      res.send(BaseResponse.error(error))
    })
})

/**
 * Endpoint que implementa un modelo "CityModel" con un método estático
 * llamado "getAll" el cual retorna una promesa
 * Permite definirle una función única a cada método que se vaya a crear
 * en el modelo. Además de permitir implementar un controlador para estos
 * modelos
 */
router.route("/all3").get((req: Request, res: Response) => {
  const model = new CityModel(new MariaDBConnection())
  model
    .getAll()
    .then((results) => {
      res.send(BaseResponse.success(results))
    })
    .catch((error) => {
      res.send(BaseResponse.error(error))
    })
})

/**
 * Endpoint que implementa un controlador "CityControler" con un método estático
 * llamado "getAll" el cual ejecuta dentro de él el res.send()
 */
const controller = new CityController(new MariaDBConnection())
router.get("/all", authMiddleware, controller.getAll)
router.post("/create", authMiddleware, controller.create)
router.put("/update", authMiddleware, controller.update)
router.delete("/delete", authMiddleware, controller.delete)

//http:localhost:8080/api/city/all
//http:localhost:8080/api/city/create
//http:localhost:8080/api/city/update
//http:localhost:8080/api/city/delete

export default router
