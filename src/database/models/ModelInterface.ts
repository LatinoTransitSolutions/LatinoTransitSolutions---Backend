interface ModelInterface {
  getAll(): Promise<unknown>
  getById(_id: string | number): Promise<unknown>
  getOne(_target: object): Promise<unknown>
  create(_object: object): Promise<unknown>
  update(_object: object): Promise<unknown>
  delete(_id: number): Promise<unknown>
}

export default ModelInterface
