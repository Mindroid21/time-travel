import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Custom components
import { MongooseConfigService } from '../config/mongoose.config.service';
import { ArtistsModule } from '../artists/artists.module';
import { AuthModule } from '../auth/auth.module';
import { GroupsModule } from '../groups/groups.module';
import { TagsModule } from '../tags/tags.module';
import { TimerModule } from '../timers/timer.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    ArtistsModule,
    AuthModule,
    GroupsModule,
    TagsModule,
    TimerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
