import ClientConcrete from "../concrete/ClienteConcrete";
import IUser from "../interface/IUser";
import UserFactory from "./UserFactory";

class ClientFactory extends UserFactory {
    creatreUser(_id: number, _name: string, _role: string, _email: string, _password: string, _company: string): IUser {
        return new ClientConcrete(_id, _name, _role,  _email, _password, _company);
    }
}

export default ClientFactory