export type PackageType = {
    id: number 
    type: string
    name: string
    description: string
    price: number
    width: number
    height: number
    length: number
    weight: number
  }
  
  export type NewPackageType = Omit<TransportType, "id">