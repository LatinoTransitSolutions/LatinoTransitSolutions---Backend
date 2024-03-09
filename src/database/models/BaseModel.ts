class BaseModel {
  /**
   * @param _values
   * @returns string
   *
   * Método que permite recibir el array de valores y obtener
   * el string neceserio para el query de SQL
   * (?, ?, ?, ?)
   */
  public getInserts(_values: object): string {
    return Array(Object.keys(_values).length).fill("?").join(", ")
  }

  /**
   *
   * @param _values
   * @returns string[]
   *
   * Método que se encarga de sacar las llaves de un objeto
   */
  public getColumns(_values: object): string[] {
    return Object.keys(_values)
  }

  /**
   *
   * @param _values
   * @returns any[]
   *
   * Método que se encarga de sacar los valores de un objeto
   */
  public getValues(_values: object): any[] {
    return Object.values(_values)
  }

  /**
   *
   * @param _values
   *
   * Método que transforma las llaves de camel case a snake case
   * para que coincidan con las columnas de la base de datos
   */
  private camelToSnake(_values: any): void {
    Object.keys(_values).forEach((key) => {
      const snakeCaseKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

      if (key !== snakeCaseKey) {
        _values[snakeCaseKey] = _values[key]
        delete _values[key]
      }
    })
  }

  /**
   *
   * @param _values
   * @returns any[]
   *
   * Método que se encarga de crear una consulta SQL de tipo
   * "insert" estandarizada para no tener que escribirla cada
   * que se crea una nueva entidad
   */
  public getInsertQuery(_values: any): any[] {
    /**
     * Se filtra el array de valores para sacar todo lo que
     * sea undefined y el id ya que no queremos insertar nada
     * que no se le especifique un valor y tampoco la columna
     * id ya que esta es autoincremental en la base de datos
     */

    let newValues: any[] = []
    let newColumns: any[] = []

    if (Array.isArray(_values)) {
      newValues = _values.map((item) => {
        item = JSON.parse(JSON.stringify(item, (key, value) => (key !== "id" && value !== undefined ? value : undefined)))
        return Object.values(item)
      })
      newColumns = JSON.parse(JSON.stringify(_values[0], (key, value) => (key !== "id" && value !== undefined ? value : undefined)))
    } else {
      newColumns = newValues = JSON.parse(JSON.stringify(_values, (key, value) => (key !== "id" && value !== undefined ? value : undefined)))
    }

    this.camelToSnake(newColumns)

    return [`INSERT INTO transport (${this.getColumns(newColumns).join(", ")}) VALUES (${this.getInserts(newColumns)})`, this.getValues(newValues)]
  }

  /**
   *
   * @param _values
   * @returns any[]
   *
   * Método que se encarga de crear una consulta SQL de tipo
   * "update" estandarizada para no tener que escribirla cada
   * que se actualiza una entidad
   */
  public getUpdateQuery(_values: any): any[] {
    const id = _values.id

    _values = JSON.parse(JSON.stringify(_values, (key, value) => (key !== "id" && value !== undefined ? value : undefined)))

    this.camelToSnake(_values)

    const columns = Object.keys(_values)
      .map((c) => `${c} = ?`)
      .join(", ")

    return [`UPDATE transport SET ${columns} WHERE id = ${id}`, this.getValues(_values)]
  }

  /**
   *
   * @param _values
   * @returns any[]
   *
   * Método que se encarga de castear los valores de un array
   * para que sean bien aceptados en la consulta SQL.
   * Por ejemplo: Para los datos de tipo string deben llevar
   * las comillas simples ('')
   */
  public convertValues(values: any[]) {
    return values.map((val) => {
      if (typeof val === "string") {
        return `'${val}'`
      } else {
        return val
      }
    })
  }
}

export default BaseModel
