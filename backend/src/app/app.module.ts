import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Custom components
import { MongooseConfigService } from '../config/mongoose.config.service';
// modules
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from './../database/database.module';
import { UserModule } from './../users/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
