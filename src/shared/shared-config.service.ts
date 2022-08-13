import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get<T = any>(property: string): T {
    const value = this.configService.get<T>(property);
    if (!value) {
      throw new Error(`environment variable <${property}> must be set`);
    }
    return value;
  }
}
