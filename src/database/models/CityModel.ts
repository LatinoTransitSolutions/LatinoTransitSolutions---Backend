import Connection from "../connection/ConnectionInterface.ts"
import Model from "./ModelInterface.ts"

/**
 * Este modelo recibe la conexión la cual le
 * va a ser guardada en el atributo "connection"
 * para que pueda ser usado en los métodos sin
 * tener que estar instanciando todo el tiempo
 * la clase derivada de Connection (MariaDBConnection)
 */
class CityModel implements Model {
  connection: Connection

  constructor(_connection: Connection) {
    this.connection = _connection
  }

  /**
   * Permite ejecutar los queries que se le
   * pasen por parámetro al método execute y
   * retorna una promesa
   */
  public getAll(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.connection
        .execute("SELECT * FROM city LIMIT 10")
        .then((results: unknown) => {
          resolve(results)
        })
        .catch((error: string) => {
          reject(error)
        })
    })
  }

  public getAllCallback(callback: (object: { error?: string | null; results?: unknown }) => void): void {
    this.connection
      .execute("SELECT * FROM city LIMIT 10")
      .then((results: unknown) => {
        callback({ results })
      })
      .catch((error: string) => {
        callback({ error })
      })
  }

  public getById(id: string | number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      resolve(id)
    })
  }

  public getOne(target: object): Promise<unknown> {
    return new Promise((resolve, reject) => {
      resolve(target)
    })
  }

  public create(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }

  public update(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }

  public delete(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }
}

export default CityModel
