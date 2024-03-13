import Permission from "./Permission";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    company: string;
    permission: Permission[];
}

export default User