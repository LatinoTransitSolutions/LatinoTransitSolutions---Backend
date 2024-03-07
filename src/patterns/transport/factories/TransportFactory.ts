import Transport from "../product/TransportInterface"
import TransportFactoryParent from "./TransportFactoryParent"

abstract class TransportFactory extends TransportFactoryParent {
  public setData(_id: number | undefined = undefined, _name: string, _maxWidth: number, _maxHeight: number, _maxLength: number, _maxWeight: number) {
    const transport: Transport = this.createTransport()
    return this.setRequiredData(transport, _id, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight)
  }

  public abstract createTransport(): Transport
}

export default TransportFactory
