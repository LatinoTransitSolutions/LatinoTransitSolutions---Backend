import Pickup from "../product/Pickup"
import ITransportPlate from "../product/ITransportPlate"
import TransportPlateFactory from "./TransportPlateFactory"

class PickupFactory extends TransportPlateFactory {
  getTransport(): ITransportPlate {
    return new Pickup()
  }
}

export default PickupFactory
