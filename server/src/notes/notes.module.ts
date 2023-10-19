import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { User } from 'src/users/entities/user.entity';
import { NoteContentModule } from 'src/note_content/note_content.module';
import { ContentDataModule } from 'src/content_data/content_data.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { NoteContent } from 'src/note_content/entities/note_content.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note, User, NoteContent]),
    NoteContentModule,
    ConfigModule,
    JwtModule,
  ],
  exports: [TypeOrmModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
