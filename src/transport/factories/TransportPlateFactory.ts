import ITransportPlate from "../product/ITransportPlate"
import TransportFactoryParent from "./TransportFactoryParent"

abstract class TransportPlateFactory extends TransportFactoryParent {
  public createTransport(_id: number | undefined = undefined, _type: string, _name: string, _maxWidth: number, _maxHeight: number, _maxLength: number, _maxWeight: number, _plate: string) {
    const transport: ITransportPlate = this.getTransport()
    this.setRequiredData(transport, _id, _type, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight)
    transport.setPlate(_plate)
    return transport
  }

  public abstract getTransport(): ITransportPlate
}

export default TransportPlateFactory
