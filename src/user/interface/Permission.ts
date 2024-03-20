import UserInterface from "./UserInterface"

interface Permission extends UserInterface{
    description: string
    type: string

    // Getters
    getDescription(): string
    getType(): string

    // Setters
    setDescription(_description: string): void
    setType(_type: string): void
}

export default Permission