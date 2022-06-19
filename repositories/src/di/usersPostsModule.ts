import { UserPostModel } from '../modules'
import { ContainerModule } from 'inversify'
import UsersPostsService from '../modules/usersPosts/usersPosts.service'
import UsersPostsRepository from '../modules/usersPosts/usersPosts.repository'

const usersPostsModule = new ContainerModule(bind => {
  bind<UsersPostsService>(UsersPostsService).toSelf()
  bind<UsersPostsRepository>(UsersPostsRepository).toSelf()
  bind<typeof UserPostModel>(UserPostModel).toFunction(UserPostModel)
})

export default usersPostsModule
