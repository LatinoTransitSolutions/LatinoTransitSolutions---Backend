interface IModel {
  getAll(): Promise<any>
  getById(_id: number): Promise<any>
  getByColumn(_target: object): Promise<any>
  create(_values: any): Promise<any>
  update(_values: any): Promise<any>
  delete(_id: number): Promise<any>
}

export default IModel
