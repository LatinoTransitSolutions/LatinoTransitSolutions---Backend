import ITransport from "../product/ITransport"
import TransportFactoryParent from "./TransportFactoryParent"

abstract class TransportFactory extends TransportFactoryParent {
  public createTransport(_id: number | undefined = undefined, _type: string, _name: string, _maxWidth: number, _maxHeight: number, _maxLength: number, _maxWeight: number) {
    const transport: ITransport = this.getTransport()
    this.setRequiredData(transport, _id, _type, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight)
    return transport
  }

  public abstract getTransport(): ITransport
}

export default TransportFactory
