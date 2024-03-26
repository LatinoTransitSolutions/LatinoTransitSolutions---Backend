import AdminConcrete from "../concrete/AdminConcrete";
import IUser from "../interface/IUser";
import UserFactory from "./UserFactory";

class AdminFactory extends UserFactory {
    creater(_id: number | undefined = undefined, _name: string, _role: string, _email: string, _password: string, _company: string): IUser {
        return new AdminConcrete(_id, _name, _role, _email, _password, _company);
    }
}

export default AdminFactory