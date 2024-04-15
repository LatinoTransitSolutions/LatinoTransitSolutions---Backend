import ITransportStrategy from "./ITransportStrategy";

class PickupStrategy implements ITransportStrategy {
    canTransportPackage(width: number, height: number, length: number, weight: number): boolean {
        const maxDimensions = {width: 1.20, height: 1, length: 0.75, weight: 120 }
        return width <= maxDimensions.width && height <= maxDimensions.height && length <= maxDimensions.length && weight <= maxDimensions.weight    }
}

export default PickupStrategy