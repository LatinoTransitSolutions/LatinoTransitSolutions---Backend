import Permission from "../interface/Permission";
import User from "../interface/User";

class Checker implements User {
    id: number;
    name: string;
    email: string;
    password: string;
    company: string;
    permission: Permission[];
    
    constructor() {
        this.permission = [
            { description: "Leer", type: "lectura" },
            { description: "Verificar", type: "verificacion" }
        ];
    }
}

export default Checker