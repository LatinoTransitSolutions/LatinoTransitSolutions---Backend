export type RouteType = {
    id: number
    name: string 
    description: string 
    type: string 
    price: number 
    approved: boolean 
    status: string
    start_latitude: number
    start_longitude: number 
    end_latitude: number
    end_longitude: number
}

export type NewRouteType = Omit<RouteType, "id">

