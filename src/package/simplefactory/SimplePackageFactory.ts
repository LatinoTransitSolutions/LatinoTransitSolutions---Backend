import BigPackage from "../entities/BigPackage";
import MediumPackage from "../entities/MediumPackage";
import SmallPackage from "../entities/SmallPackage";
import IPackageFactory from "../interfaces/IPackage";

class SimplePackageFactory {
    createPackage(type: string, _id: number, _name: string, _description: string, _price: number, _width: number, _height: number, _length: number, _weight: number): IPackageFactory {
        switch (type) {
            case 'big':
                return new BigPackage(_id, _name, _description, _price, _width, _height, _length, _weight);
            case 'medium': 
                return new MediumPackage(_id, _name, _description, _price, _width, _height, _length, _weight);
            case 'small':
                return new SmallPackage(_id, _name, _description, _price, _width, _height, _length, _weight);
            default:
                throw new Error('Invalid package type');
        }
    }
}

export default SimplePackageFactory