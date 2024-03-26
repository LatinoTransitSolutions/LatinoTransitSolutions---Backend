import Motorcycle from "../product/Motorcycle"
import ITransportPlate from "../product/ITransportPlate"
import TransportPlateFactory from "./TransportPlateFactory"

class MotorcycleFactory extends TransportPlateFactory {
  getTransport(): ITransportPlate {
    return new Motorcycle()
  }
}

export default MotorcycleFactory
