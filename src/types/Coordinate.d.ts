export type CoordinateType = {
  id: number
  latitude: string
  longitude: string
}

export type NewCoordinateType = Omit<CoordinateType, "id">
