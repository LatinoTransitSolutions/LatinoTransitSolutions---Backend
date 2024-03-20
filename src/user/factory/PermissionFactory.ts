import Permission from "../interface/Permission";
import RolInterface from "../interface/Rol";
import UserFactoryParent from "./UserFactoryParent";

abstract class PermissionFactory extends UserFactoryParent{
    let userPermissionRol = Permission | RolInterface
    public setData(_id: number | undefined = undefined,  _name: string, _email: string, _password: string, _company: string, _rol: string, _permission: string) {
        const user: Permission = this.createUser()
        user.setRol()
        user.setPermission(_permission)
        return this.setRequiredData(user, _id, _name, _email, _password, _company)
    }

    public abstract createUser(): Permission
}

export default PermissionFactory