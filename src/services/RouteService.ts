import RouteConcreteBuilder from "../route/builder/RouteConcreteBuilder.ts"
import RouteDirectorBuilder from "../route/builder/RouteDirectorBuilder.ts"
import Coordinate from "../route/entities/Coordinate.ts"
import Route from "../route/entities/Route.ts"

class RouteService {

    public static createRouteEntity(_id: number | undefined = undefined, _name: string, _description: string, _price: number, _startLatitude: string, _startLongitude: string, _endLatitude: string, _endLongitude: string): Route {
        const routeBuilder: RouteConcreteBuilder = new RouteConcreteBuilder()
        const routeDirector: RouteDirectorBuilder = new RouteDirectorBuilder(routeBuilder)

        let route: Route = null 
        const distance = calculateDistance(_startLatitude, _startLongitude, _endLatitude, _endLongitude)

        if(distance >= 60){
            routeDirector.createLongRoute(_id, _name, _description, _price, _startLatitude, _startLongitude, _endLatitude, _endLongitude)
            route = routeBuilder.getRoute()
        } else if(distance <= 30 && distance > 10){
            routeDirector.createMediumRoute(_id, _name, _description, _price, _startLatitude, _startLongitude, _endLatitude, _endLongitude)
            route = routeBuilder.getRoute()
        }else{
            routeDirector.createShortRoute(_id, _name, _description, _price, _startLatitude, _startLongitude, _endLatitude, _endLongitude)
            route = routeBuilder.getRoute()
        }
        console.log(route.getStartPoint().getName)

        return route
    }

    public static getCoordinate(_latitude: string, _longitude: string){
        return new Coordinate(_latitude, _longitude);
    }
}

/**
 * Function to convert degrees to radians
 * 
 * @param _degrees 
 * @returns radians 
 */
function degreesToRadians(_degrees: number): number {
    return _degrees * (Math.PI / 180)
}

/**
 * Function to calculate the distance between two geographic points 
 * (start point and finish point) in kilometers
 * 
 * @param _lat1 start latitude
 * @param _lon1 start longitude
 * @param _lat2 end latitude
 * @param _lon2 end longitude
 * @returns distance
 */
function calculateDistance(_lat1: string, _lon1: string, _lat2: string, _lon2: string): number {
    const earthRadiusKm = 6371

    const dLat = degreesToRadians(parseInt(_lat2) - parseInt(_lat1))
    const dLon = degreesToRadians(parseInt(_lon2) - parseInt(_lon1))

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(parseInt(_lat1))) *
      Math.cos(degreesToRadians(parseInt(_lat2))) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = earthRadiusKm * c; // Distancia en kilómetros

      return distance
}

export default RouteService


