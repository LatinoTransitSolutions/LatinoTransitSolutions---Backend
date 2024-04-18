import VerificationChain from "../package-transport/chainofresponsability/TransportHandler";
import SizeStrategy from "../package-transport/strategy/SizeStrategy";
import WeightStrategy from "../package-transport/strategy/WeightStrategy";
import { PackageType } from "../types/Package";
import { TransportType } from "../types/Transport";

import { TripType } from "../types/Trip";

class TripService {

    public static createTripEntity(_id: number | undefined = undefined, _idUser: number, _idPackage: number, _idTransportRoute: number): TripType {
        const trip: TripType = { id: _id, idClient: _idUser, idPackage: _idPackage, idTransportRoute: _idTransportRoute }
        return trip
    }

    public static canHandlePackage(_package: PackageType, _transport: TransportType): boolean {
        const verifySize = new SizeStrategy()
        const verifyWeight = new WeightStrategy()

        const verificationChain = new VerificationChain()
        verificationChain.addStrategy(verifySize)
        verificationChain.addStrategy(verifyWeight)

        if (verificationChain.canTransportPackage(_package, _transport)) {
            return true
        } else {
            return false
        }
    }
}

export default TripService