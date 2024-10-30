import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostGateway } from './post.gateway';
import { Community } from '../community/community.entity';
import { User } from '../auth/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PostReaction } from './post-reaction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Post,
            PostReaction,
            Community,
            User
        ])
    ],
    controllers: [PostController],
    providers: [PostService, PostGateway, JwtService]
})
export class PostModule {}
