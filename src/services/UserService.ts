import AdminFactory from "../user/factories/AdminFactory"
import ApproverFactory from "../user/factories/ApproverFactory"
import CarrierFactory from "../user/factories/CarrierFactory"
import CheckerFactory from "../user/factories/CheckerCarrier"
import ClientFactory from "../user/factories/ClientFactory"
import IUser from "../user/interface/IUser"

class UserService {
  static createUser(_id: number | undefined = undefined, _name: string, _role: string, _email: string, _password: string, _company: string): IUser | null {
    let factory = null

    switch (_role) {
      case "client":
        factory = new ClientFactory()
        break
      case "checker":
        factory = new CheckerFactory()
        break
      case "carrier":
        factory = new CarrierFactory()
        break
      case "approver":
        factory = new ApproverFactory()
        break
      case "admin":
        factory = new AdminFactory()
        break
      default:
        throw new Error("Rol de usuario no válido")
    }

    return factory.creater(_id, _name, _role, _email, _password, _company)
  }
}

export default UserService
