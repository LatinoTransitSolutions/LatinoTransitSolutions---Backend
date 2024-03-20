import Rol from "../../enums/Rol";
import Permission from "./Permission";

interface UserInterface {
    id: number
    name: string
    email: string
    password: string
    company: string
    rol: Rol
    permission: Permission[]

    // Getters
    getId(): number
    getName(): string
    getEmail(): string
    getPassword(): string
    getCompany(): string
    getRol(): Rol
    getPermission(): Permission[]

    // Setters
    setId(_id: number): void
    setName(_name: string): void
    setEmail(_email: string): void
    setPassword(_password: string): void
    setCompany(_empresa: string): void
    setRol(_rol: Rol): void
    setPermission(_permission: Permission[]): void
}

export default UserInterface