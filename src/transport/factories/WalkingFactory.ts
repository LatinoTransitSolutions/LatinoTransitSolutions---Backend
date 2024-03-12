import Transport from "../product/TransportInterface"
import TransportFactory from "./TransportFactory"
import Walking from "../product/Walking"

class WalkingFactory extends TransportFactory {
  createTransport(): Transport {
    return new Walking()
  }
}

export default WalkingFactory
