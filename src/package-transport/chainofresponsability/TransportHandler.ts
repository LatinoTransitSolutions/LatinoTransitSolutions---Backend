import { PackageType } from "../../types/Package";
import { TransportType } from "../../types/Transport";
import IVerificationStrategy from "../strategy/IVerificationStrategy";
class VerificationChain {
  private strategies: IVerificationStrategy[] = [];

  addStrategy(_strategy: IVerificationStrategy): void {
    this.strategies.push(_strategy);
  }

  canTransportPackage(_package: PackageType, _transports: TransportType[]): TransportType | string {
    for (const transport of _transports) {
      let isValid = true
      for (const strategy of this.strategies) {
        if (!strategy.verifyPackage(_package, transport)) {
          isValid = false
          break; 
        }
      }
      if (isValid) {
        return transport
      }
    }
    return "No transport available to handle the package"
  }
}

export default VerificationChain