interface ModelInterface {
  getAll(): Promise<unknown>
  getAllCallback(callback: (object: { error?: string | null; results?: unknown }) => void): void
  getById(id: string | number): Promise<unknown>
  getOne(target: object): Promise<unknown>
  create(): Promise<unknown>
  update(): Promise<unknown>
  delete(): Promise<unknown>
}

export default ModelInterface
