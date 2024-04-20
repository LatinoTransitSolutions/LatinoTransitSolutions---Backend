import { PackageType } from "../../types/Package";
import { TransportType } from "../../types/Transport";
import IVerificationStrategy from "./IVerificationStrategy";


class SizeStrategy implements IVerificationStrategy {

  verifyPackage(_package: PackageType, _transport: TransportType): boolean {
    return (
      _package.width <= _transport.maxWidth &&
      _package.height <= _transport.maxHeight &&
      _package.length <= _transport.maxLength
    )
  }
}

export default SizeStrategy