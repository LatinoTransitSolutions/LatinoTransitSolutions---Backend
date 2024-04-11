import IPackage from "../package/interfaces/IPackage";
import SimplePackageFactory from "../package/simplefactory/SimplePackageFactory";

class PackageService {
    public static createPackageEntity(_id: number | undefined = undefined, name: string, description: string, price: number, width: number, height: number, length: number, weight: number): IPackage {
       const packageFactory: SimplePackageFactory = new SimplePackageFactory()

       let packageEntity: IPackage = null

        const dimensions = calculateDimensions()

        return packageEntity;

    }

    
}

function calculateDimensions(): number {


        return 0;
}