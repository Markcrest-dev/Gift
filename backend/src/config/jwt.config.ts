import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET', 'default-secret'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRATION', '7d') as `${number}d`,
    },
  }),
};
