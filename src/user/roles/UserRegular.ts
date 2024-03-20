import Rol from "../../enums/Rol";
import Permission from "../interface/Permission";
import User from "../interface/UserInterface";

class UserRegular implements User{
    id: number;
    name: string;
    email: string;
    password: string;
    company: string;
    permission: Permission[];

    constructor() {
        this.permission = [];
    }
    rol: Rol;
    getRol(): Rol {
        throw new Error("Method not implemented.");
    }
    setRol(_rol: Rol): void {
        throw new Error("Method not implemented.");
    }
    getId(): number {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getEmail(): string {
        throw new Error("Method not implemented.");
    }
    getPassword(): string {
        throw new Error("Method not implemented.");
    }
    getCompany(): string {
        throw new Error("Method not implemented.");
    }
    getPermission(): Permission[] {
        throw new Error("Method not implemented.");
    }
    setId(id: number): void {
        throw new Error("Method not implemented.");
    }
    setName(name: string): void {
        throw new Error("Method not implemented.");
    }
    setEmail(email: string): void {
        throw new Error("Method not implemented.");
    }
    setPassword(password: string): void {
        throw new Error("Method not implemented.");
    }
    setCompany(empresa: string): void {
        throw new Error("Method not implemented.");
    }
    setPermission(permission: Permission[]): void {
        throw new Error("Method not implemented.");
    }
}

export default UserRegular