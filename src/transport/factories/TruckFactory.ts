import Truck from "../product/Truck"
import TransportPlate from "../product/TransportPlateInterface"
import TransportPlateFactory from "./TransportPlateFactory"

class TruckFactory extends TransportPlateFactory {
  createTransport(): TransportPlate {
    return new Truck()
  }
}

export default TruckFactory
