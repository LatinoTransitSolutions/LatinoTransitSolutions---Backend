import Transport from "../product/TransportInterface"
import TransportPlate from "../product/TransportPlateInterface"

type TransportType = Transport | TransportPlate

class TransportFactoryParent {
  public setRequiredData(_transport: TransportType, _id: number | undefined = undefined, _name: string, _maxWidth: number, _maxHeight: number, _maxLength: number, _maxWeight: number) {
    _transport.setId(_id)
    _transport.setName(_name)
    _transport.setMaxWidth(_maxWidth)
    _transport.setMaxHeight(_maxHeight)
    _transport.setMaxLength(_maxLength)
    _transport.setMaxWeight(_maxWeight)

    return _transport
  }
}

export default TransportFactoryParent
