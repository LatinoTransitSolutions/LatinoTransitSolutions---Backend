import ITransport from "./ITransport"

interface ITransportPlate extends ITransport {
  plate: string

  getPlate(): string
  setPlate(_plate: string): void
}

export default ITransportPlate
