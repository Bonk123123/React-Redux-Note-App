import { Module } from '@nestjs/common';
import { NoteContentService } from './note_content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteContent } from './entities/note_content.entity';
import { Note } from 'src/notes/entities/note.entity';
import { ContentDataModule } from 'src/content_data/content_data.module';
import { ContentData } from 'src/content_data/entities/content_datum.entity';
import { NoteContentController } from './note_content.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteContent, Note, ContentData]),
    ContentDataModule,
  ],
  exports: [TypeOrmModule, NoteContentService],
  controllers: [NoteContentController],
  providers: [NoteContentService],
})
export class NoteContentModule {}
