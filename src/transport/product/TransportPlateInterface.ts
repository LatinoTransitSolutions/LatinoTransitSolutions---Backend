import TransportInterface from "./TransportInterface"

interface TransportPlateInterface extends TransportInterface {
  plate: string

  getPlate(): string
  setPlate(_plate: string): void
}

export default TransportPlateInterface
