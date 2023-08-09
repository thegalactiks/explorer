export class MaxDepthLimitReachedError extends Error {
  constructor() {
    super(`The max depth limit has been reached.`)
  }
}
