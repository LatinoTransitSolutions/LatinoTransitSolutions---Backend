import { TransportsTypes } from "../enums/Transport.ts"
import TransportFactory from "../transport/factories/TransportFactory.ts"
import TransportPlateFactory from "../transport/factories/TransportPlateFactory.ts"
import ITransport from "../transport/product/ITransport.ts"
import ITransportPlate from "../transport/product/ITransportPlate.ts"
import WalkingFactory from "../transport/factories/WalkingFactory.ts"
import MotorcycleFactory from "../transport/factories/MotorcycleFactory.ts"
import PickupFactory from "../transport/factories/PickupFactory.ts"
import TruckFactory from "../transport/factories/TruckFactory.ts"

class TransportService {
  public static createTransportEntity(_id: number | undefined = undefined, _type: string, _name: string, _maxWidth: number, _maxHeight: number, _maxLength: number, _maxWeight: number, _plate: string): ITransport | ITransportPlate {
    let factory: TransportFactory | TransportPlateFactory = null
    let transport: ITransport | ITransportPlate = null

    switch (_type) {
      case TransportsTypes.WALKING:
        factory = new WalkingFactory()
        transport = factory.createTransport(_id, TransportsTypes.WALKING, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight)
        break
      case TransportsTypes.MOTORCYCLE:
        factory = new MotorcycleFactory()
        transport = factory.createTransport(_id, TransportsTypes.MOTORCYCLE, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight, _plate)
        break
      case TransportsTypes.PICKUP:
        factory = new PickupFactory()
        transport = factory.createTransport(_id, TransportsTypes.PICKUP, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight, _plate)
        break
      case TransportsTypes.TRUCK:
        factory = new TruckFactory()
        transport = factory.createTransport(_id, TransportsTypes.TRUCK, _name, _maxWidth, _maxHeight, _maxLength, _maxWeight, _plate)
        break
    }

    return transport
  }
}

export default TransportService
