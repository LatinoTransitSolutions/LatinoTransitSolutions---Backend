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
  private camelToSnake(_values: any): object {
    const entries = Object.entries(_values).map(([key, value]) => {
      key = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      return [key, value]
    })

    return Object.fromEntries(entries)
  }

  /**
   *
   * @param _values
   *
   * Método que remueve las llaves que poseen como valor un
   * undefiend (vacío) y la columna id
   */
  private cleanUpValues(_values: object): object {
    const entries = Object.entries(_values)
      .map(([key, value]) => {
        return key !== "id" && value !== undefined ? [key, value] : undefined
      })
      .filter((val) => val)

    return Object.fromEntries(entries)
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
  public getInsertQuery(_values: any, _table: string): any[] {
    /**
     * Se utiliza el método camelToSnake() para darle compatibilidad
     * a los atributos escritos con camelCase de los objetos del
     * código con los nombres de las columnas de las tablas que fueron
     * escritas en snakeCase
     */
    const columns = this.camelToSnake(this.cleanUpValues(_values[0] || _values))

    /**
     * Se filtran los valores con el método cleanUp() para sacar
     * todo lo que sea undefined y el id ya que no queremos insertar
     * nada que no se le especifique un valor y tampoco la columna
     * id ya que esta es autoincremental en la base de datos
     */
    if (Array.isArray(_values)) {
      _values = _values.map((val) => {
        return this.getValues(this.cleanUpValues(val))
      })
    } else {
      _values = this.getValues(this.cleanUpValues(_values))
    }

    return [`INSERT INTO ${_table} (${this.getColumns(columns).join(", ")}) VALUES (${this.getInserts(columns)})`, _values]
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
  public getUpdateQuery(_values: any, _table: string): any[] {
    const id = _values.id

    _values = this.camelToSnake(this.cleanUpValues(_values))

    const columns = this.getColumns(_values)
      .map((c) => `${c} = ?`)
      .join(", ")

    return [`UPDATE ${_table} SET ${columns} WHERE id = ${id}`, this.getValues(_values)]
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
