import IUser from "../interface/IUser"

class ApproverConcrete implements IUser {
  id: number
  name: string
  role: string
  email: string
  password: string
  company: string

  constructor(_id: number, _name: string, _role: string, _email: string, _password: string, _company: string) {
    this.id = _id
    this.name = _name
    this.role = _role
    this.email = _email
    this.password = _password
    this.company = _company
  }

  approveRoute() {
    // Implementación aquí
  }
}

export default ApproverConcrete
