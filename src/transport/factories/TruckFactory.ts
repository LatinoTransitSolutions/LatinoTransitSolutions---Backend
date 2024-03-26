import Truck from "../product/Truck"
import ITransportPlate from "../product/ITransportPlate"
import TransportPlateFactory from "./TransportPlateFactory"

class TruckFactory extends TransportPlateFactory {
  getTransport(): ITransportPlate {
    return new Truck()
  }
}

export default TruckFactory
