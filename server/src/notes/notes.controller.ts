import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
// @UseGuards(AuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post('')
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.createNote(createNoteDto);
  }

  @Get('')
  async findByName(@Query('search') search: string) {
    if (search) {
      return await this.notesService.findByName(search);
    } else {
      return await this.notesService.findAll();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.notesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notesService.remove(id);
  }
}
