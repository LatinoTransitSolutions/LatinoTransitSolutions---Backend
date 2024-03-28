import ITransport from "../product/ITransport"
import TransportFactory from "./TransportFactory"
import Walking from "../product/Walking"

class WalkingFactory extends TransportFactory {
  getTransport(): ITransport {
    return new Walking()
  }
}

export default WalkingFactory
