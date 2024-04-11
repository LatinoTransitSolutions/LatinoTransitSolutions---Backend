import BigPackage from "../entities/BigPackage";
import MediumPackage from "../entities/MediumPackage";
import SmallPackage from "../entities/SmallPackage";
import IPackageFactory from "../interfaces/IPackage";

class SimplePackageFactory {
    createPackage(type: string): IPackageFactory {
        switch (type) {
            case 'big':
                return new BigPackage();
            case 'medium':
                return new MediumPackage();
            case 'small':
                return new SmallPackage();
            default:
                throw new Error('Invalid package type');
        }
    }
}

export default SimplePackageFactory