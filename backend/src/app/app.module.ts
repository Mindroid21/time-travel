import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Custom components
import { MongooseConfigService } from '../config/mongoose.config.service';
import { ArtistsModule } from '../artists/artists.module';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';
import { GroupsModule } from '../groups/groups.module';
import { TagsModule } from '../tags/tags.module';
import { DraftModule } from '../drafts/drafts.module';
import { SongModule } from '../songs/songs.module';
import { PlaylistModule } from '../playlists/playlists.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    ArtistsModule,
    AuthModule,
    GroupsModule,
    TagsModule,
    DraftModule,
    EmailModule,
    SongModule,
    PlaylistModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
