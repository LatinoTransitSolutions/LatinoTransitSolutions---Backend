import Permission from "../interface/Permission";
import User from "../interface/User";

class Approver implements User {
    id: number;
    name: string;
    email: string;
    password: string;
    company: string;
    permission: Permission[];

    constructor() {
        this.permission = [
            { description: "Leer", type: "lectura" },
            { description: "Aprobar", type: "aprobacion" }
        ];
    }
}

export default Approver