import CheckerConcrete from "../concrete/CheckerConcrete";
import IUser from "../interface/IUser";
import UserFactory from "./UserFactory";

class CheckerFactory extends UserFactory {
    creater(_id: number | undefined = undefined, _name: string, _role: string, _email: string, _password: string, _company: string): IUser {
        return new CheckerConcrete(_id, _name, _role,  _email, _password, _company);
    }
}

export default CheckerFactory