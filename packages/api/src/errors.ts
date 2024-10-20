export class AuthenticationError extends Error {
  code = "UNAUTHENTICATED";
  constructor(message = "Not authenticated") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  code = "UNAUTHORIZED";
  constructor(message = "Not authorized") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class InsufficientFundsError extends Error {
  code = "INSUFFICIENT_FUNDS";
  constructor(message = "Insufficient funds for this transaction") {
    super(message);
    this.name = "InsufficientFundsError";
  }
}

export class AccountNotFoundError extends Error {
  code = "ACCOUNT_NOT_FOUND";
  constructor(message = "Account not found") {
    super(message);
    this.name = "AccountNotFoundError";
  }
}

export class UserExistsError extends Error {
  code = "USER_EXISTS";
  constructor(message = "User already exists") {
    super(message);
    this.name = "UserExistsError";
  }
}

export class InvalidCredentialsError extends Error {
  code = "INVALID_CREDENTIALS";
  constructor(message = "Invalid credentials") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}
