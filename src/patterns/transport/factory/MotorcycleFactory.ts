import Motorcycle from "../product/Motorcycle"
import TransportPlate from "../product/TransportPlateInterface"
import TransportPlateFactory from "./TransportPlateFactory"

class MotorcycleFactory extends TransportPlateFactory {
  createTransport(): TransportPlate {
    return new Motorcycle()
  }
}

export default MotorcycleFactory
