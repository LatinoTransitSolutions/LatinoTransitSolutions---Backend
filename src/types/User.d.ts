export type UserType = {
  id: number
  name: string
  role: string
  email: string
  password: string
  company: string
}

export type NewUserType = Omit<UserType, "id">
