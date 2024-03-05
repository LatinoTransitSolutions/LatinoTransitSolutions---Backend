export type Transport = {
  id: number
  type: string
  name: string
  max_width: number
  max_height: number
  max_length: number
  max_weight: number
}

export type NewTransport = Omit<Transport, "id">
