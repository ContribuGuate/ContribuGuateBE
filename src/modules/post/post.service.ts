import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { AddPostRequest } from "./dto/request/add-post.request";
import { AddPostResponse } from "./dto/response/add-post.response";
import { Community } from "../community/community.entity";
import { GetPostsResponse } from "./dto/response/get-posts.response";
import { User } from "../auth/user.entity";
import { AddReactionResponse } from "./dto/response/add-reaction.response";
import { PostReaction } from "./post-reaction.entity";
import { AddReactionRequest } from "./dto/request/add-reaction.request";

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>,
        @InjectRepository(PostReaction) private readonly postReactionRepo: Repository<PostReaction>,
        @InjectRepository(Community) private readonly communityRepository: Repository<Community>,
        @InjectRepository(User) private readonly userRepo: Repository<User>) { 
            
        }

    
        public async randomReactions() {
            const posts = await this.postRepository.find();
            const users = await this.userRepo.find();
            const reactions = ['love', 'inspire', 'like'];
        
            for (const post of posts) {
                const user = users[Math.floor(Math.random() * users.length)];
                const reaction = reactions[Math.floor(Math.random() * reactions.length)];
        
                // Verificar si ya existe una reacción para este post y usuario
                const existingReaction = await this.postReactionRepo.findOne({
                    where: {
                        post: post,
                        user: user,
                    },
                });
        
                if (!existingReaction) {
                    const newReaction = new PostReaction();
                    newReaction.post = post;
                    newReaction.user = user;
                    newReaction.reaction = reaction;
        
                    await this.postReactionRepo.save(newReaction);
                }
            }
        }


    public async addPost(req: any, body: AddPostRequest) {
        var response = new AddPostResponse();
        try {
            var post = new Post();
            post.description = body.description;
            post.author = await this.userRepo.findOne({ where: { uuid: req.user.sub } });
            
            if (body.community != null) {
                const community = await this.communityRepository.findOne({ where: { uuid: body.community } });
                post.community = community;
            }
            const save = await this.postRepository.save(post);
            response.success = true;
            response.message = 'Post creado';
            response.post = save;
            return response;
        } catch (err) {
            console.log(err);
            response.success = false;
            response.message = err.message;
            return response;
        }
    }

    /**
     * Retrieves all posts from the repository, including related author information.
     * Returns a GetPostsResponse object containing the success status, message, and list of posts.
     * If an error occurs, the response will indicate failure with an error message.
     */
    public async getPosts() {
        var response = new GetPostsResponse();
        try {
            const posts = await this.postRepository.createQueryBuilder('post')
                .leftJoinAndSelect('post.author', 'author')
                .leftJoinAndSelect('post.reactions', 'reactions')
                .leftJoinAndSelect('reactions.user', 'user')
                .leftJoinAndSelect('post.community', 'community')
                .where('post.community IS NULL')
                .orderBy('post.createdAt', 'DESC')
                .getMany();

            response.success = true;
            response.message = 'Posts encontrados';
            response.posts = posts;
            return response;
        } catch (err) {
            response.success = false;
            response.message = err.message;
            return response;
        }
    }

    public async addReaction(req: any, body: AddReactionRequest) {
        var response = new AddReactionResponse();
        try {
            const reaction = new PostReaction();
            const user = await this.userRepo.findOne({ where: { uuid: req.user.sub } });
            const post = await this.postRepository.findOne({ where: { uuid: body.post } });

            const find = await this.postReactionRepo.createQueryBuilder('reaction')
                .where('reaction.user = :user', { user: user.uuid })
                .andWhere('reaction.post = :post', { post: post.uuid })
                .getOne();

            if (find != null) {
                await this.postReactionRepo.remove(find);
                response.success = true;
                response.message = 'Reaccion eliminada';
                return response;
            } else {
                reaction.user = user;
                reaction.post = post;
                reaction.reaction = body.reaction;
                const save = await this.postReactionRepo.save(reaction);
                response.reaction = save;
                response.success = true;
                response.message = 'Reaccion creada';
                return response;
                
            }

        } catch (err) {
            response.success = false;
            response.message = 'Error al crear la reaccion';
            return response;
        }
    }
}