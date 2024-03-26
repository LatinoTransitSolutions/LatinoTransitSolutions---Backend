import IUser from "../interface/IUser"

abstract class UserFactory {
  abstract creater(_id: number, _name: string, _role: string, _email: string, _password: string, _company: string): IUser
}

export default UserFactory
