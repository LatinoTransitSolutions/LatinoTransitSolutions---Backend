export type RouteType = {
  id?: number
  name: string
  description: string
  type: string
  price: number
  approved: boolean
  startLatitude: string
  startLongitude: string
  endLatitude: string
  endLongitude: string
}

export type NewRouteType = Omit<RouteType, "id">

export type CreateRouteType = Pick<RouteType, "name" | "description" | "type" | "price" | "approved"> & {
  startPointID: number
  endPointID: number
}
