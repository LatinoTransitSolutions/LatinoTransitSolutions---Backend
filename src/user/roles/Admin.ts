import Permission from "../interface/Permission";
import User from "../interface/User";

class Admin implements User {
    id: number;
    name: string;
    email: string;
    password: string;
    company: string;
    permission: Permission[];

    constructor() {
        this.permission = [
            { description: "Leer", type: "lectura" },
            { description: "Escribir", type: "escritura" },
            { description: "Verificar", type: "verificacion" },
            { description: "Aprobar", type: "aprobacion" },
            { description: "Administrar", type: "administracion" }
        ];
    }
}

export default Admin