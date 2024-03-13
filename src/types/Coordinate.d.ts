export type CoordinateType = {
    id: number
    latitude: number 
    longitude: number 
}

export type NewCoordinateType = Omit<CoordinateType, "id">