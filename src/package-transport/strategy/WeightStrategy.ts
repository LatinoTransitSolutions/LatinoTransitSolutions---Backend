import { PackageType } from "../../types/Package";
import { TransportType } from "../../types/Transport";
import IVerificationStrategy from "./IVerificationStrategy";


class WeightStrategy implements IVerificationStrategy {

  verifyPackage(_package: PackageType, _transport: TransportType): boolean {
    return (
      _package.weight >= _transport.maxWeight
    )
  }
}

export default WeightStrategy