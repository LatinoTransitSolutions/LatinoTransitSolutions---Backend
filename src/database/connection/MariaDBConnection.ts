import { SqlError, PoolConnection } from "mariadb"
import db from "../db.ts"
import BaseException from "../../common/BaseException.ts"
import Connection from "./ConnectionInterface.ts"

/**
 * Clase que permite hacer la conexión con MariaDB
 *
 * Es una fachada ya que se implementa un método
 * "execute" que conecta con la librería de mariadb
 * y a su vez es un singleton ya que solo maneja
 * una instancia de la clase
 */
class MariaDBConnection implements Connection {
  private static instance: MariaDBConnection

  public static getInstance(): MariaDBConnection {
    if (!this.instance) {
      this.instance = new MariaDBConnection()
    }

    return this.instance
  }

  /**
   * Método que permite hacer la conexión y una vez
   * conectados se ejecuta un query (_query)
   *
   * connection.release(): Libera la conexión hecha
   * para la petición para que se pueda volver a usar
   *
   * Se retorna una promesa para cuando la base de datos
   * responda, pueda enviar los resultados
   *
   * En caso de error se responde con el error procesado
   * por medio de la clase "BaseException" y se hace un
   * console log del error para tener toda la info del
   * error
   */
  public execute(_query: string, _values: any[] = []): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      db.getConnection()
        .then((connection: PoolConnection) => {
          connection
            .query(_query, _values)
            .then((results: any[]) => {
              connection.release()
              resolve(results)
            })
            .catch((error: SqlError) => {
              reject(BaseException.process(error))
              console.log("Error executing query:", error)
            })
        })
        .catch((error: SqlError) => {
          reject(BaseException.process(error))
          console.log("Error connecting with database:", error)
        })
    })
  }
}

export default MariaDBConnection
