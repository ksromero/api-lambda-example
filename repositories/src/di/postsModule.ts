import { PostModel } from '../modules'
import { ContainerModule } from 'inversify'
import PostsService from '../modules/posts/posts.service'
import PostsRepository from '../modules/posts/posts.repository'

const postsModule = new ContainerModule(bind => {
  bind<PostsService>(PostsService).toSelf()
  bind<PostsRepository>(PostsRepository).toSelf()
  bind<typeof PostModel>(PostModel).toFunction(PostModel)
})

export default postsModule

