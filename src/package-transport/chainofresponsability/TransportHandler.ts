import ITransportStrategy from "../strategy/ITransportStrategy";

class TransportHandler {
    private transportStrategies: ITransportStrategy[] = [];
  
    addStrategy(strategy: ITransportStrategy): void {
      this.transportStrategies.push(strategy);
    }
  
    assignTransport(width: number, height: number, depth: number, weight: number): string {
      for (const strategy of this.transportStrategies) {
        if (strategy.canTransportPackage(width, height, depth, weight)) {
          return strategy.constructor.name; 
        }
      }
      return 'No transport available for the package dimensions';
    }
  }

  export default TransportHandler