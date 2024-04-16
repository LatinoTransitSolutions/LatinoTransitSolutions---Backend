import VerificationChain from "../package-transport/chainofresponsability/TransportHandler";
import SizeStrategy from "../package-transport/strategy/SizeStrategy";
import WeightStrategy from "../package-transport/strategy/WeightStrategy";
import { PackageType } from "../types/Package";
import { TransportType, NewTransportType } from "../types/Transport";

class TripService {

    static package: PackageType | null = null
    static transports: TransportType[] | null = null
  
    public static addPackageTransport(): TransportType | string{
        const verifySize = new SizeStrategy()
        const verifyWeight = new WeightStrategy()

        const verificationChain = new VerificationChain()
        verificationChain.addStrategy(verifySize)
        verificationChain.addStrategy(verifyWeight)

        return verificationChain.canTransportPackage(this.package, this.transports)
    }

    static getTransports(_transports: TransportType[]) {
        this.transports = _transports
    }

    static getPackage(_package: PackageType): PackageType {
        return this.package = _package
    }
}

export default TripService