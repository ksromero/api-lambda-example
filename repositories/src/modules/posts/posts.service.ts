import { injectable } from 'inversify'
import PostsRepository from './posts.repository'

@injectable()
class PostsService {
  private postsRepository: PostsRepository

  constructor(postsRepository: PostsRepository) {
    this.postsRepository = postsRepository
  }

  async getAllPosts() {
    const posts = this.postsRepository.find()
    
    return await posts
  }

  async createPost(title: string, description?: string) {
    const create = this.postsRepository.insert({ title, description })

    return await create
  }
}

export default PostsService