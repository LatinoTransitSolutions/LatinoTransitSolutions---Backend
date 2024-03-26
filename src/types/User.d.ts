export type UserType = {
  id: number
  name: string
  rol: string
  email: string
  password: string
  company: string
}

export type NewUserType = Omit<NewUserType, "id">
