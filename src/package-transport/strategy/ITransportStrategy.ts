interface TransportStrategyInterface {
    canTransportPackage(width: number, height: number, length: number, weight: number): boolean
} 

export default TransportStrategyInterface