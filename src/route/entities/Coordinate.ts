class Coordinate {
  private id: number
  private latitude: string
  private longitude: string

  constructor(_latitude: string, _longitude: string, _id: number | undefined = undefined) {
    this.id = _id
    this.latitude = _latitude
    this.longitude = _longitude
  }

  public getId(): number {
    return this.id
  }

  public setId(_id: number) {
    this.id = _id
  }

  public getLatitude(): string {
    return this.latitude
  }

  public setLatitude(_latitude: string) {
    this.latitude = _latitude
  }

  public getLongitude(): string {
    return this.longitude
  }

  public setLongitude(_longitude: string) {
    this.longitude = _longitude
  }
}

export default Coordinate
