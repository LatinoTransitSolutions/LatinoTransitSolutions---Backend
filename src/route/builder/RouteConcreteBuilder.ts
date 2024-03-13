import Point from "../entities/Point.ts";
import Route from "../entities/Route.ts";
import RouteStatus from "../../enums/RouteStatus.ts";
import RouteType from "../../enums/RouteType.ts";
import IRouteBuilder from "../interfaces/IRouteBuilder.ts";
import Coordinate from "../entities/Coordinate.ts";

class RouteConcreteBuilder implements IRouteBuilder {
    private route: Route = new Route()

    private id: number 
    private name: string
    private description: string
    private type: RouteType
    private price: number
    private approved: boolean
    private status: RouteStatus
    private startPoint: Point
    private endPoint: Point

    setId(_id: number): void {
        this.id = _id
    }
    setName(_name: string): void {
        this.name = _name
    }
    setDescription(_description: string): void {
        this.description = _description
    }
    setType(_type: RouteType): void {
        this.type = _type
    }
    setPrice(_price: number): void {
        this.price = _price
    }
    setApproved(_approved: boolean): void {
        this.approved = _approved
    }
    setStatus(_status: RouteStatus): void {
        this.status = _status
    }
    setStartPoint(_startLatitude: number, _startLongitude: number): void {
        this.startPoint = new Point(undefined, "Pickup address", new Coordinate(undefined, _startLatitude, _startLongitude))
    }
    setEndPoint(_endLatidude: number, _endLongitude: number): void {
        this.endPoint = new Point(undefined, "Delivery address", new Coordinate(undefined, _endLatidude, _endLongitude))
    }

    getRoute(): Route{
        return new Route(
           this.id,
           this.name,
           this.description,
           this.type,
           this.price,
           this.approved,
           this.status,
           this.startPoint,
           this.endPoint
        )
    }

}

export default RouteConcreteBuilder