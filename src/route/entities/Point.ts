import Coordinate from "./Coordinate.ts"

class Point{
    private id: number 
    private name: string 
    private coordinate: Coordinate

    constructor(_id: number | undefined = undefined, _name: string, _coordinate: Coordinate){
        this.id = _id
        this.name = _name
        this.coordinate = _coordinate
    }

    public getId(): number{
        return this.id
    }

    public setId(_id: number){
        this.id = _id
    }

    public getName(): string{
        return this.name
    }

    public setName(_name: string){
        this.name = _name
    }

    public getCoordinate(): Coordinate{
        return this.coordinate
    }

    public setCoordinate(_coordinate: Coordinate){
        this.coordinate = _coordinate
    }
}

export default Point