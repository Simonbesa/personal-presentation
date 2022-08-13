export class JwtSecretKey {
  private readonly value: string;

  constructor(base64EncodedSecretKey: string) {
    this.value = base64EncodedSecretKey;
  }

  toAscii(): string {
    const buff = Buffer.from(this.value, 'base64');
    return buff.toString('ascii');
  }
}
