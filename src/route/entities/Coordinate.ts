class Coordinate{
    private id: number
    private latitude: number 
    private longitude: number 

    constructor(_id: number, _latitude: number, _longitude: number){
        this.id = _id
        this.latitude = _latitude
        this.longitude = _longitude
    }

    public getId(): number{
        return this.id
    }

    public setId(_id: number){
        this.id = _id
    }

    public getLatitude(): number{
        return this.latitude
    }

    public setLatitude(_latitude: number){
        this.latitude = _latitude
    }

    public getLongitude(): number{
        return this.longitude
    }

    public setLongitude(_longitude: number){
        this.longitude = _longitude
    }
}

export default Coordinate