interface ConnectionInterface {
  execute(_query: string, _values?: any[]): Promise<unknown>
}

export default ConnectionInterface
