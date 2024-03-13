import RouteStatus from "../../enums/RouteStatus.ts"
import RouteType from "../../enums/RouteType.ts"
import Point from "./Point.ts"

class Route{
    private id: number | undefined
    private name: string 
    private description: string 
    private type: RouteType 
    private price: number 
    private approved: boolean 
    private status: RouteStatus 
    private startPoint: Point
    private endPoint: Point 

    constructor(_id: number | undefined = undefined, _name?: string, _description?: string, _type?: RouteType, _price?: number, _approved?: boolean, _status?: RouteStatus, _startPoint?: Point, _endPoint?: Point){
        this.id = _id
        this.name = _name 
        this.description = _description
        this.type = _type
        this.price = _price
        this.approved = _approved
        this.status = _status
        this.startPoint = _startPoint
        this.endPoint = _endPoint
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

    public getDescription(): string{
        return this.description
    }

    public setDescription(_description: string){
        this.description = _description
    }

    public getType(): RouteType {
        return this.type
    }
    public setType(_type: RouteType) {
        this.type = _type
    }

    public getPrice(): number{
        return this.price
    }

    public setPrice(_price: number){
        this.price = _price
    }

    public getApproved(): boolean{
        return this.approved
    }

    public setApproved(_approved: boolean){
        this.approved = _approved
    }

    public getStatus(): RouteStatus{
        return this.status
    }

    public setStatus(_status: RouteStatus){
        this.status = _status
    }

    public getStartPoint(): Point{
        return this.startPoint
    }

    public setStartPoint(_startPoint: Point){
        this.startPoint = _startPoint
    }

    public getEndPoint(): Point{
        return this.endPoint
    }

    public setEndPoint(_endPoint: Point){
        this.endPoint = _endPoint
    }
}

export default Route