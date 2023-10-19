import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database.module';
import { NoteContentModule } from './note_content/note_content.module';
import { ContentDataModule } from './content_data/content_data.module';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { imageFileFilter } from './utils/imageFileFilter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'noteImages'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    NotesModule,
    UsersModule,
    NoteContentModule,
    ContentDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
