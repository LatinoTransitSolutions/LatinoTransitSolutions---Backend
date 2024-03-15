export type RouteType = {
    id: number
    name: string 
    description: string 
    type: string 
    price: number 
    approved: boolean 
    status: string
    start_latitude: string
    start_longitude: string 
    end_latitude: string
    end_longitude: string
}

export type NewRouteType = Omit<RouteType, "id">

