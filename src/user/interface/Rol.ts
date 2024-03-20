import UserInterface from "./UserInterface";

interface RolInterface extends UserInterface {
    rolName: string

    getRolName(): string
    setRolName(_rolName: string): void
}

export default RolInterface