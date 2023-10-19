import { Module } from '@nestjs/common';
import { ContentDataService } from './content_data.service';
import { ContentData } from './entities/content_datum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContentData])],
  exports: [TypeOrmModule, ContentDataService],
  controllers: [],
  providers: [ContentDataService],
})
export class ContentDataModule {}
