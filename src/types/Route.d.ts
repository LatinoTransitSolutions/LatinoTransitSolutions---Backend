export type RouteType = {
    id: number
    name: string 
    description: string 
    type: string 
    price: number 
    approved: boolean 
    status: string
    startLatitude: string
    startLongitude: string 
    endLatitude: string
    endLongitude: string
}

export type NewRouteType = Omit<RouteType, "id">

