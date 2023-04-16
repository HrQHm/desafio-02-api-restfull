export class UserHasNoMealError extends Error {
  constructor() {
    super('User has no registered meal')
  }
}