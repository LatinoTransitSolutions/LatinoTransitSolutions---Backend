import TransportPlate from "../product/TransportPlateInterface"
import TransportFactoryParent from "./TransportFactoryParent"

abstract class TransportPlateFactory extends TransportFactoryParent {
  public setData(_id: number | undefined = undefined, _type: string, _name: string, _maxWidth: number, _maxHeight: number, _maxLength: number, _maxWeight: number, _plate: string) {
    const transport: TransportPlate = this.createTransport()
    transport.setPlate(_plate)
    return this.setRequiredData(transport, _id, _type, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight)
  }

  public abstract createTransport(): TransportPlate
}

export default TransportPlateFactory
