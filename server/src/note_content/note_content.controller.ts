import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NoteContentService } from './note_content.service';
import { CreateNoteContentDto } from './dto/create-note_content.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFileName';
import { imageFileFilter } from 'src/utils/imageFileFilter';

@Controller('note-contents')
export class NoteContentController {
  constructor(private noteContentService: NoteContentService) {}

  @Post(':note_id')
  @UseInterceptors(
    FileInterceptor('content', {
      storage: diskStorage({
        destination: './src/noteImages',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() createNoteDto: CreateNoteContentDto,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Param('note_id') note_id: string,
  ) {
    return await this.noteContentService.create(note_id, createNoteDto, file);
  }

  @Get(':note_id')
  async findByNote(@Param('note_id') note_id: string) {
    return await this.noteContentService.findAllNoteContent(note_id);
  }

  @Delete(':note_id')
  async removeByNoteId(@Param('note_id') note_id: string) {
    return await this.noteContentService.removeByNoteId(note_id);
  }
}
