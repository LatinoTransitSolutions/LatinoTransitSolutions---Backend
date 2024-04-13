import RouteType from "../../enums/RouteType.ts"
import IRouteBuilder from "../interfaces/IRouteBuilder.ts"

class RouteDirectorBuilder {
  constructor(private builder: IRouteBuilder) {}

  public createLongRoute(_id: number | undefined = undefined, _name: string, _description: string, _price: number, _startLatitude: string, _startLongitude: string, _endLatitude: string, _endLongitude: string, _distance: number) {
    this.builder.setId(_id)
    this.builder.setName(_name)
    this.builder.setDescription(_description)
    this.builder.setType(RouteType.LONG_ROUTE)
    this.builder.setPrice(_price)
    this.builder.setApproved(false)
    this.builder.setStartPoint(_startLatitude, _startLongitude)
    this.builder.setEndPoint(_endLatitude, _endLongitude)
    this.builder.setDistance(_distance)
  }

  public createMediumRoute(_id: number | undefined = undefined, _name: string, _description: string, _price: number, _startLatitude: string, _startLongitude: string, _endLatitude: string, _endLongitude: string, _distance: number) {
    this.builder.setId(_id)
    this.builder.setName(_name)
    this.builder.setDescription(_description)
    this.builder.setType(RouteType.MEDIUM_ROUTE)
    this.builder.setPrice(_price)
    this.builder.setApproved(false)
    this.builder.setStartPoint(_startLatitude, _startLongitude)
    this.builder.setEndPoint(_endLatitude, _endLongitude)
    this.builder.setDistance(_distance)
  }

  public createShortRoute(_id: number | undefined = undefined, _name: string, _description: string, _price: number, _startLatitude: string, _startLongitude: string, _endLatitude: string, _endLongitude: string, _distance: number) {
    this.builder.setId(_id)
    this.builder.setName(_name)
    this.builder.setDescription(_description)
    this.builder.setType(RouteType.SHORT_ROUTE)
    this.builder.setPrice(_price)
    this.builder.setApproved(false)
    this.builder.setStartPoint(_startLatitude, _startLongitude)
    this.builder.setEndPoint(_endLatitude, _endLongitude)
    this.builder.setDistance(_distance)
  }
}

export default RouteDirectorBuilder
