import AdminFactory from "../user/factories/AdminFactory"
import ApproverFactory from "../user/factories/ApproverFactory"
import CarrierFactory from "../user/factories/CarrierFactory"
import CheckerFactory from "../user/factories/CheckerCarrier"
import ClientFactory from "../user/factories/ClientFactory"
import IUser from "../user/interface/IUser"

class UserService {
  static creatreUser(_id: number, _name: string, _role: string, _email: string, _password: string, _company: string): IUser {
    
    switch (_role) {
      case 'Client':
        return new ClientFactory().creatreUser(_id, _name, _role,  _email, _password, _company)
      case 'Checker':
        return new CheckerFactory().creatreUser(_id, _name, _role,  _email, _password, _company)
      case 'Carrier':
        return new CarrierFactory().creatreUser(_id, _name, _role,  _email, _password, _company)
      case 'Approver':
        return new ApproverFactory().creatreUser(_id, _name, _role,  _email, _password, _company)
      case 'Admin:':
        return new AdminFactory().creatreUser(_id, _name, _role,  _email, _password, _company)
      default:
        throw new Error("Rol de usuario no valido")
    }
  }
}

export default UserService