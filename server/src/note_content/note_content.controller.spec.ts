import { Test, TestingModule } from '@nestjs/testing';
import { NoteContentController } from './note_content.controller';

describe('NoteContentController', () => {
  let controller: NoteContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteContentController],
    }).compile();

    controller = module.get<NoteContentController>(NoteContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
