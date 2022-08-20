export class SignInResponse {
  token: string;
  exp: number;
  type: string;

  public constructor(token: string, expirationTime: number, type: string) {
    this.token = token;
    this.exp = expirationTime;
    this.type = type;
  }
}
