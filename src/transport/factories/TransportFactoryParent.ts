import ITransport from "../product/ITransport"
import ITransportPlate from "../product/ITransportPlate"

type TransportType = ITransport | ITransportPlate

class TransportFactoryParent {
  protected setRequiredData(_transport: TransportType, _id: number | undefined = undefined, _type: string, _name: string, _maxWidth: number, _maxHeight: number, _maxLength: number, _maxWeight: number) {
    _transport.setId(_id)
    _transport.setType(_type)
    _transport.setName(_name)
    _transport.setMaxWidth(_maxWidth)
    _transport.setMaxHeight(_maxHeight)
    _transport.setMaxLength(_maxLength)
    _transport.setMaxWeight(_maxWeight)

    return _transport
  }
}

export default TransportFactoryParent
