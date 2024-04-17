import VerificationChain from "../package-transport/chainofresponsability/TransportHandler";
import SizeStrategy from "../package-transport/strategy/SizeStrategy";
import WeightStrategy from "../package-transport/strategy/WeightStrategy";

import { PackageType } from "../types/Package";
import { TransportType } from "../types/Transport";
import { NewTripType, TripType } from "../types/Trip";

class TripService {

    public static createTripEntity(_id: number | undefined = undefined, idClient: number, idPackage: number, idTransportRoute: number ): TripType{
        return null 
    }

    public static addPackageTransport(_package: PackageType, _transports: TransportType ): TransportType | string{
        const verifySize = new SizeStrategy()
        const verifyWeight = new WeightStrategy()

        const verificationChain = new VerificationChain()
        verificationChain.addStrategy(verifySize)
        verificationChain.addStrategy(verifyWeight)

        if(verificationChain.canTransportPackage(_package, _transports)){
            //return _package
        } else {
            //return verificationChain.canTransportPackage(_package, _transports)
            return "This transport can no handle this package"
        }
    }
}

export default TripService