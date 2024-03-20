import Rol from "../../enums/Rol";
import Permission from "../interface/Permission";
import RolInterface from "../interface/Rol";
import UserInterface from "../interface/UserInterface";

type UserType = UserInterface | Permission | RolInterface

class UserFactoryParent {
    public setRequiredData(_user: UserType, _id: number | undefined = undefined,  _name: string, _email: string, _password: string, _company: string){
        _user.setId(_id)
        _user.setName(_name)
        _user.setEmail(_email)
        _user.setPassword(_password)
        _user.setCompany(_company)

        return _user
    }
}

export default UserFactoryParent