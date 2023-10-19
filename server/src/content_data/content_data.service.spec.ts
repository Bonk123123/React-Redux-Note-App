import { Test, TestingModule } from '@nestjs/testing';
import { ContentDataService } from './content_data.service';

describe('ContentDataService', () => {
  let service: ContentDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentDataService],
    }).compile();

    service = module.get<ContentDataService>(ContentDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
