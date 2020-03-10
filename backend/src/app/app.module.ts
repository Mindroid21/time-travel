import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Custom components
import { MongooseConfigService } from '../config/mongoose.config.service';
import { AuthModule } from '../auth/auth.module';
import { TimerModule } from '../timers/timer.module';
import { QuoteModule } from '../quotes/quotes.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    AuthModule,
    TimerModule,
    QuoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
