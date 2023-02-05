import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import IAuthJwtPayload from 'libs/contracts/src/lib/account/commands/auth/auth.payload'
import { ExtractJwt, Strategy } from 'passport-jwt'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            ignoreExpiration: true,
            secretOrKey: configService.get('SECRET')
        })
    }

    async validate({ id }: IAuthJwtPayload) {
        return id;
    }
}
