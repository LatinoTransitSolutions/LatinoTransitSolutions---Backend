import TransportPlate from "./TransportPlateInterface"

class Truck implements TransportPlate {
  id: number
  type: string
  name: string
  maxWidth: number
  maxHeight: number
  maxLength: number
  maxWeight: number
  plate: string

  public getId(): number {
    return this.id
  }

  public setId(_id: number): void {
    this.id = _id
  }

  public getType(): string {
    return this.type
  }

  public setType(_type: string): void {
    this.type = _type
  }

  public getName(): string {
    return this.name
  }

  public setName(_name: string): void {
    this.name = _name
  }

  public getMaxWidth(): number {
    return this.maxWidth
  }

  public setMaxWidth(_maxWidth: number): void {
    this.maxWidth = _maxWidth
  }

  public getMaxHeight(): number {
    return this.maxHeight
  }

  public setMaxHeight(_maxHeight: number): void {
    this.maxHeight = _maxHeight
  }

  public getMaxLength(): number {
    return this.maxLength
  }

  public setMaxLength(_maxLength: number): void {
    this.maxLength = _maxLength
  }

  public getMaxWeight(): number {
    return this.maxWeight
  }

  public setMaxWeight(_maxWeight: number): void {
    this.maxWeight = _maxWeight
  }

  public getPlate(): string {
    return this.plate
  }

  public setPlate(_plate: string): void {
    this.plate = _plate
  }
}

export default Truck
