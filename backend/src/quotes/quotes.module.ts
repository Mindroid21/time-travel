import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
// custom
import { QuoteController } from './controllers/quotes.controller';
import { QuoteService } from './services/quotes.service';
import { jwtSecret } from '../auth/config/jwt.config';
import { QuoteSchema } from './models/quotes.model';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtSecret.secretOrKey,
      signOptions: {
        expiresIn: jwtSecret.expiry,
      },
    }),
    MongooseModule.forFeature([
        {
            name: 'Quote',
            schema: QuoteSchema
        }
    ])
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
  exports: [QuoteService]
})
export class QuoteModule {}
