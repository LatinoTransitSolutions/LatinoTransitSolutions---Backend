import { TransportsTypes } from "../enums/Transport.ts"
import TransportFactory from "../patterns/transport/factories/TransportFactory.ts"
import TransportPlateFactory from "../patterns/transport/factories/TransportPlateFactory.ts"
import Transport from "../patterns/transport/product/TransportInterface.ts"
import TransportPlate from "../patterns/transport/product/TransportPlateInterface.ts"
import WalkingFactory from "../patterns/transport/factories/WalkingFactory.ts"
import MotorcycleFactory from "../patterns/transport/factories/MotorcycleFactory.ts"
import PickupFactory from "../patterns/transport/factories/PickupFactory.ts"
import TruckFactory from "../patterns/transport/factories/TruckFactory.ts"

class TransportService {
  public static createTransportEntity(_id: number | undefined = undefined, _type: string, _name: string, _maxWidth: number, _maxHeight: number, _maxLength: number, _maxWeight: number, _plate: string): Transport | TransportPlate {
    let factory: TransportFactory | TransportPlateFactory = null
    let transport: Transport | TransportPlate = null

    switch (_type) {
      case TransportsTypes.WALKING:
        factory = new WalkingFactory()
        transport = factory.setData(_id, TransportsTypes.WALKING, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight)
        break
      case TransportsTypes.MOTORCYCLE:
        factory = new MotorcycleFactory()
        transport = factory.setData(_id, TransportsTypes.MOTORCYCLE, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight, _plate)
        break
      case TransportsTypes.PICKUP:
        factory = new PickupFactory()
        transport = factory.setData(_id, TransportsTypes.PICKUP, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight, _plate)
        break
      case TransportsTypes.TRUCK:
        factory = new TruckFactory()
        transport = factory.setData(_id, TransportsTypes.TRUCK, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight, _plate)
        break
    }

    return transport
  }
}

export default TransportService
