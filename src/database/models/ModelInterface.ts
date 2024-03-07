interface ModelInterface {
  getAll(): Promise<any>
  getById(_id: number): Promise<any>
  getOne(_target: object): Promise<any>
  create(_object: object): Promise<any>
  update(_object: object): Promise<any>
  delete(_id: number): Promise<any>
}

export default ModelInterface
