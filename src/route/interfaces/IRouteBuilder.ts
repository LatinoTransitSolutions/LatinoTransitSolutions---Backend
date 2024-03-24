import RouteStatus from "../../enums/RouteStatus.ts"
import RouteType from "../../enums/RouteType.ts"
import Route from "../entities/Route.ts"

interface IRouteBuilder{
    setId(_id: number): void
    setName(_name: string): void
    setDescription(_description: string): void
    setType(_type: RouteType): void
    setPrice(_price: number): void
    setApproved(_approved: boolean): void
    setStatus(_status: RouteStatus): void 
    setStartPoint(_startLatitude: string, _startLongitude: string): void
    setEndPoint(_endLatitude: string, _endLongitude: string): void
    getRoute(): Route
}

export default IRouteBuilder