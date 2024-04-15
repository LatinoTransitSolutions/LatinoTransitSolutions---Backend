import ITransportStrategy from "./MotorcycleStrategy";

class WalkingStrategy implements ITransportStrategy{
    canTransportPackage(width: number, height: number, length: number, weight: number): boolean {
        const maxDimensions = {width: 0.30, height: 0.30, length: 0.35, weight: 10 }
        return width <= maxDimensions.width && height <= maxDimensions.height && length <= maxDimensions.length && weight <= maxDimensions.weight
    }
}

export default WalkingStrategy