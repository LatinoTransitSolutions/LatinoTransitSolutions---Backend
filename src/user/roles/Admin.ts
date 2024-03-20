import Permission from "../interface/Permission";
import User from "../interface/UserInterface";

class Admin implements User {
    id: number;
    name: string;
    email: string;
    password: string;
    company: string;
    permission: Permission[];

    constructor(id: number, name: string, email: string, password: string, company: string, permission: Permission[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.company = company;
        this.permission = permission;
        //     [{ description: "Leer", type: "lectura" },
        //     { description: "Escribir", type: "escritura" },
        //     { description: "Verificar", type: "verificacion" },
        //     { description: "Aprobar", type: "aprobacion" },
        //     { description: "Administrar", type: "administracion" }];
    }
    getId(): number {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getEmail(): string {
        throw new Error("Method not implemented.");
    }
    getPassword(): string {
        throw new Error("Method not implemented.");
    }
    getCompany(): string {
        throw new Error("Method not implemented.");
    }
    getPermission(): Permission[] {
        throw new Error("Method not implemented.");
    }
    setId(id: number): void {
        throw new Error("Method not implemented.");
    }
    setName(name: string): void {
        throw new Error("Method not implemented.");
    }
    setEmail(email: string): void {
        throw new Error("Method not implemented.");
    }
    setPassword(password: string): void {
        throw new Error("Method not implemented.");
    }
    setCompany(empresa: string): void {
        throw new Error("Method not implemented.");
    }
    setPermission(permission: Permission[]): void {
        throw new Error("Method not implemented.");
    }
}

export default Admin