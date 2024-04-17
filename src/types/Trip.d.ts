export type TripType = { 
    id?: number
    idClient: number        
    idPackage: number         
    idTransportRoute: number  
}

export type NewTripType = Omit<TripType, "id">