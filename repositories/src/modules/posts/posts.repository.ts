import { PostModel } from '../'
import { inject, injectable } from 'inversify'
import { ReturnModelType } from '@typegoose/typegoose'
import BaseRepo from '../../shared/base.repository'

@injectable()
class PostsRepository extends BaseRepo<typeof PostModel>{

  public postModel: ReturnModelType<typeof PostModel>

  constructor(@inject(PostModel) postModel: ReturnModelType<typeof PostModel>) {
    super(postModel)
  }

  async getPostsWithIds(postsIds: string[] ) {
    return this.entityModel.find({ _id: { $in : postsIds }})
  }
}

export default PostsRepository