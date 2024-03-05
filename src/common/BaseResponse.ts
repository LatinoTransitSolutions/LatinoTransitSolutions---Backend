class Response {
  ok: boolean
  message: string | undefined
  error: object | string | undefined
  data: unknown | undefined

  constructor()

  constructor(_message?: string | undefined)

  constructor(_message?: string | undefined) {
    this.ok = true
    this.message = _message
  }

  setOk(_ok: boolean): void {
    this.ok = _ok
  }

  getOk(): boolean {
    return this.ok
  }

  setMessage(_message: string): void {
    this.message = _message
  }

  getMessage(): string | undefined {
    return this.message
  }

  setError(_error: object | string | undefined): void {
    this.error = _error
  }

  getError(): object | string | undefined {
    return this.error
  }

  setData(_data: unknown): void {
    this.data = _data
  }

  getData(): unknown {
    return this.data
  }

  addOk(_ok: boolean) {
    this.setOk(_ok)
    return this
  }

  addMessage(_message: string) {
    this.setMessage(_message)
    return this
  }

  addError(_error: object | string | undefined) {
    this.setError(_error)
    this.setOk(false)
    return this
  }

  addData(_data: unknown) {
    this.setData(_data)
    return this
  }

  static error(_error: object | string | undefined = "There was an error on server") {
    return {
      ok: false,
      error: _error
    }
  }

  static success(_data: unknown | undefined = undefined, _message: string | undefined = undefined) {
    return {
      ok: true,
      message: _message,
      data: _data ?? undefined
    }
  }

  toString() {
    return {
      ok: this.getOk(),
      message: this.getMessage(),
      error: this.getError(),
      data: this.getData()
    }
  }
}

export default Response
