import { SqlError } from "mariadb"

type BaseExceptionType = SqlError

class BaseException {
  private message: string | undefined

  constructor(_exception: BaseExceptionType) {
    this.message = BaseException.process(_exception)
  }

  public getMessage(): string | undefined {
    return this.message
  }

  public setMessage(_message: string) {
    this.message = _message
  }

  public static process(_exception: BaseExceptionType) {
    if (_exception instanceof SqlError) {
      return "There was an error with the database"
    } else {
      return "There was an error on server"
    }
  }
}

export default BaseException
