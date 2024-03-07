export type TransportType = {
  id: number
  type: string
  name: string
  max_width: number
  max_height: number
  max_length: number
  max_weight: number
  plate: string
}

export type NewTransportType = Omit<TransportType, "id">
