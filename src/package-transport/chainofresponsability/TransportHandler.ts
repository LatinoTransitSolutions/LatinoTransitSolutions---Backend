import { PackageType } from "../../types/Package";
import { TransportType } from "../../types/Transport";
import IVerificationStrategy from "../strategy/IVerificationStrategy";
class VerificationChain {
  private strategies: IVerificationStrategy[] = [];

  addStrategy(_strategy: IVerificationStrategy): void {
    this.strategies.push(_strategy);
  }

  canTransportPackage(_package: PackageType, _transports: TransportType): boolean {
      for (const strategy of this.strategies) {
        if (!strategy.verifyPackage(_package, _transports)) {
          return false;
        }
      }
      return true;
    }
}

export default VerificationChain