import User from "../interface/User";
import Admin from "../roles/Admin";
import Approver from "../roles/Approver";
import Checker from "../roles/Checker";
import Client from "../roles/Client";

class UserFactory {
    static crearUsuario(rol: Rol): User {
        switch (rol) {
            case Rol.Client:
                return new Client();
            case Rol.Checker:
                return new Checker();
            case Rol.Approver:
                return new Approver();
            case Rol.Admin:
                return new Admin();
            default:
                throw new Error("Rol de usuario no válido");
        }
    }
}

export default UserFactory