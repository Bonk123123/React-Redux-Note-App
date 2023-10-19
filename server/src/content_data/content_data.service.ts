import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContentDatumDto } from './dto/create-content_datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentData } from './entities/content_datum.entity';

@Injectable()
export class ContentDataService {
  constructor(
    @InjectRepository(ContentData)
    private readonly contentDataRepository: Repository<ContentData>,
  ) {}

  async create(createContentDatumDto: CreateContentDatumDto) {
    if (typeof createContentDatumDto.data === 'string') {
      const data = this.contentDataRepository.create({
        content_id: createContentDatumDto.content_id,
        data: createContentDatumDto.data,
      });
      await this.contentDataRepository.save(data);
      return data;
    } else if (typeof createContentDatumDto.data !== 'string') {
      for (let i = 0; i < createContentDatumDto.data.length; i++) {
        for (let j = 0; j < createContentDatumDto.data[i].length; j++) {
          const data = this.contentDataRepository.create({
            content_id: createContentDatumDto.content_id,
            data: createContentDatumDto.data[i][j],
          });
          await this.contentDataRepository.save(data);
        }
      }
    }
  }

  async findAllByContentId(id: string) {
    const contentData = this.contentDataRepository
      .createQueryBuilder()
      .select('content_data.data')
      .from(ContentData, 'content_data')
      .where('content_data.content_id= :id', { id })
      .getMany();

    return contentData;
  }

  async removeByContentId(content_id: string) {
    await this.contentDataRepository.delete({ content_id });
  }

  async remove(id: string) {
    await this.contentDataRepository.delete(id);
  }
}
