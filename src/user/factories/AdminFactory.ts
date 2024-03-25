import AdminConcrete from "../concrete/AdminConcrete";
import IUser from "../interface/IUser";
import UserFactory from "./UserFactory";

class AdminFactory extends UserFactory {
    creatreUser(_id: number, _name: string, _role: string, _email: string, _password: string, _company: string): IUser {
        return new AdminConcrete(_id, _name, _role, _email, _password, _company);
    }
}

export default AdminFactory