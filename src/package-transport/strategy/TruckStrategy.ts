import ITransportStrategy from "./ITransportStrategy";

class TruckStrategy implements ITransportStrategy {
    canTransportPackage(width: number, height: number, length: number, weight: number): boolean {
        const maxDimensions = {width: 2.55, height: 4, length: 12, weight: 18000 }
        return width <= maxDimensions.width && height <= maxDimensions.height && length <= maxDimensions.length && weight <= maxDimensions.weight    }
}

export default TruckStrategy