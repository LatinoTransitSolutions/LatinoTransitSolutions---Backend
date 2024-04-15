import ITransportStrategy from "./ITransportStrategy";

class MotorcycleStrategy implements ITransportStrategy {
    canTransportPackage(width: number, height: number, length: number, weight: number): boolean {
        const maxDimensions = {width: 0.40, height: 0.40, length: 0.45, weight: 50 }
        return width <= maxDimensions.width && height <= maxDimensions.height && length <= maxDimensions.length && weight <= maxDimensions.weight    }
}

export default MotorcycleStrategy