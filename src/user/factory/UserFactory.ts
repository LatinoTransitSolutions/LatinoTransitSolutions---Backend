import { Rol } from "../../enums/Rol";
import Permission from "../interface/Permission";
import User from "../interface/UserInterface";
import Admin from "../roles/Admin";
import Approver from "../roles/Approver";
import Carrier from "../roles/Carrier";
import Checker from "../roles/Checker";
import Client from "../roles/Client";
import UserRegular from "../roles/UserRegular";

class UserFactory {
    public static createUserEntity(_id: number | undefined = undefined,  _name: string, _email: string, _password: string, _company: string, _rol: Rol, _permission: Permission[]): User | Permission {
        let factory: UserFactory | User


        switch (_rol) {
            case Rol.UserRegular:
                factory = new UserRegular();
            case Rol.Client:
                return new Client();
            case Rol.Checker:
                return new Checker();
            case Rol.Approver:
                return new Approver();
            case Rol.Admin:
                return new Admin();
            case Rol.Carrier:
                return new Carrier();
            default:
                throw new Error("Rol de usuario no válido");
        }
    }
}

export default UserFactory