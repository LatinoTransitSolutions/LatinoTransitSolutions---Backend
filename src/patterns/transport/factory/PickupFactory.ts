import Pickup from "../product/Pickup"
import TransportPlate from "../product/TransportPlateInterface"
import TransportPlateFactory from "./TransportPlateFactory"

class PickupFactory extends TransportPlateFactory {
  createTransport(): TransportPlate {
    return new Pickup()
  }
}

export default PickupFactory
