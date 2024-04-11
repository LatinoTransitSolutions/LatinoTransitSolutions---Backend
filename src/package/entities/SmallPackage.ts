import { PackageTypes } from "../../enums/PackageTypes";
import IPackage from "../interfaces/IPackageFactory";

class SmallPackage implements IPackage {
    id: number
    type: PackageTypes
    name: string
    description: string
    price: number
    width: number
    height: number
    length: number
    weight: number

    constructor(_id: number | undefined = undefined,_type?: PackageTypes, _name?: string, _description?: string, _price?: number, _width?: number, _height?: number, _length?: number, _weight?: number) {
        this.id = _id
        this.type = _type
        this.name = _name 
        this.description = _description
        this.price = _price
        this.width = _width
        this.height = _height
        this.length = _length
        this.weight = _weight
    }

    public getId(): number {
        return this.id
    }

    public setId(_id: number): void {
        this.id = _id
    }

    getType(): PackageTypes {
        return this.type
    }

    setType(_type: PackageTypes): void {
        this.type = _type
    }

    getName(): string {
        return this.name
    }

    setName(_name: string): void {
        this.name = _name
    }

    getDescription(): string {
        return this.description
    }

    setDescription(_description: string): void {
        this.description = _description
    }

    getPrice(): number {
        return this.price
    }

    setPrice(_price: number): void {
        this.price = _price
    }

    getWidth(): number {
        return this.width
    }

    setWidth(_width: number): void {
        this.width = _width
    }

    getHeight(): number {
        return this.height
    }

    setHeight(_height: number): void {
        this.height = _height
    }

    getLength(): number {
        return this.length
    }

    setLength(_length: number): void {
        this.length = _length
    }

    getWeight(): number {
        return this.weight
    }

    setWeight(_weight: number): void {
        this.weight = _weight
    }
}

export default SmallPackage