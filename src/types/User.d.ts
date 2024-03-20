import Rol from "../enums/Rol"
import Permission from "../user/interface/Permission"

export type UserType = { 
    id: number
    name: string
    email: string
    password: string
    company: string
    rol: Rol
    permission: Permission[]
}

export type NewUserType = Omit<UserType, "id">