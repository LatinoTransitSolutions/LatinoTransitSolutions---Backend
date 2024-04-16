import { PackageType } from "../../types/Package"
import { TransportType } from "../../types/Transport"

interface VerificationStrategyInterface {
    verifyPackage(_package: PackageType, _transports: TransportType): boolean 
} 

export default VerificationStrategyInterface