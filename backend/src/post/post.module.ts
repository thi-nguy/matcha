import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [PostResolver, PostService],
  exports: [PostService],
  imports: [PrismaModule],
})
export class PostModule {}
