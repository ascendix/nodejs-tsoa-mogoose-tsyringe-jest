export enum ErrorType {
  AuthenticationFailed = 1,
  Unknown = 2,
}
export class ServerError extends Error {
  constructor(
    message: string,
    public readonly status = 500,
    public readonly type: ErrorType = ErrorType.Unknown,
  ) {
    super(message);
  }
}
