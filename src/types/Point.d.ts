export type PointType = {
    id: number 
    name: string 
    coordinate: Coordinate
}

export type NewPointType = Omit<PointType, "id">