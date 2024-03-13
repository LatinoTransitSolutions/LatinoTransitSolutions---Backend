import RouteStatus from "../../enums/RouteStatus.ts"
import RouteType from "../../enums/RouteType.ts"
import IRouteBuilder from "../interfaces/IRouteBuilder.ts"

class RouteDirectorBuilder {

    constructor(private builder: IRouteBuilder){}

    public createLongRoute(_id: number | undefined = undefined, _name: string, _description: string, _price: number, _startLatitude: number, _startLongitude: number, _endLatidude: number, _endLongitude: number){
        this.builder.setId(_id)
        this.builder.setName(_name)
        this.builder.setDescription(_description)
        this.builder.setType(RouteType.LONG_ROUTE)
        this.builder.setPrice(_price)
        this.builder.setApproved(false)
        this.builder.setStatus(RouteStatus.AVAILABLE)
        this.builder.setStartPoint(_startLatitude, _startLongitude)
        this.builder.setEndPoint(_endLatidude, _endLongitude)
    }

    public createMediumRoute(_id: number | undefined = undefined, _name: string, _description: string, _price: number, _startLatitude: number, _startLongitude: number, _endLatidude: number, _endLongitude: number){
        this.builder.setId(_id)
        this.builder.setName(_name)
        this.builder.setDescription(_description)
        this.builder.setType(RouteType.MEDIUM_ROUTE)
        this.builder.setPrice(_price)
        this.builder.setApproved(false)
        this.builder.setStatus(RouteStatus.AVAILABLE)
        this.builder.setStartPoint(_startLatitude, _startLongitude)
        this.builder.setEndPoint(_endLatidude, _endLongitude)
    }

    public createShortRoute(_id: number | undefined = undefined, _name: string, _description: string, _price: number, _startLatitude: number, _startLongitude: number, _endLatidude: number, _endLongitude: number){
        this.builder.setId(_id)
        this.builder.setName(_name)
        this.builder.setDescription(_description)
        this.builder.setType(RouteType.SHORT_ROUTE)
        this.builder.setPrice(_price)
        this.builder.setApproved(false)
        this.builder.setStatus(RouteStatus.AVAILABLE)
        this.builder.setStartPoint(_startLatitude, _startLongitude)
        this.builder.setEndPoint(_endLatidude, _endLongitude)
    }
}

export default RouteDirectorBuilder

