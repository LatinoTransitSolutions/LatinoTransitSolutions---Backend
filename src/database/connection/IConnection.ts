interface ConnectionInterface {
  execute(_query: string, _values?: any[], _method?: string): Promise<unknown>
}

export default ConnectionInterface
