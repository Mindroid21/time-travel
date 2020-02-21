import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Custom components
import { MongooseConfigService } from '../config/mongoose.config.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
