interface ConnectionInterface {
  execute(_query: string): Promise<unknown>
}

export default ConnectionInterface
