interface TransportInterface {
  id: number
  type: string
  name: string
  maxWidth: number
  maxHeight: number
  maxLength: number
  maxWeight: number

  getId(): number
  setId(_id: number): void
  getType(): string
  setType(_type: string): void
  getName(): string
  setName(_name: string): void
  getMaxWidth(): number
  setMaxWidth(_maxWidth: number): void
  getMaxHeight(): number
  setMaxHeight(_maxHeight: number): void
  getMaxLength(): number
  setMaxLength(_maxLength: number): void
  getMaxWeight(): number
  setMaxWeight(_maxWeight: number): void
}

export default TransportInterface
