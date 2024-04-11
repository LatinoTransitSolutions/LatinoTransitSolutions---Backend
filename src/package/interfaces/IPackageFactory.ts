import { PackageTypes } from "../../enums/PackageTypes"

interface PackageInterface {
    id: number | undefined 
    type: PackageTypes
    name: string
    description: string
    price: number
    width: number
    height: number
    length: number;
    weight: number;
    
    getId(): number
    setId(_id: number): void
    getType(): PackageTypes
    setType(_type: PackageTypes): void
    getName(): string
    setName(_name: string): void
    getDescription(): string
    setDescription(_description: string): void
    getPrice(): number
    setPrice(_price: number): void
    getWidth(): number
    setWidth(_width: number): void
    getHeight(): number
    setHeight(_height: number): void
    getLength(): number
    setLength(_length: number): void
    getWeight(): number
    setWeight(_weight: number): void
}

export default PackageInterface