import { Test, TestingModule } from '@nestjs/testing';
import { NoteContentService } from './note_content.service';

describe('NoteContentService', () => {
  let service: NoteContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteContentService],
    }).compile();

    service = module.get<NoteContentService>(NoteContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
