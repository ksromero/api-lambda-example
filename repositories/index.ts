import connectDb from './src/connection'
import { response } from './src/shared/utils'
import { ErrorCode } from './src/shared/errCode'
import { AppError, handleError } from './src/shared/app.error'
import * as representation from './src/modules'
import container from './src/di/container'
import UsersService from './src/modules/users/users.service'
import UsersRepository from './src/modules/users/users.repository'
import UsersPostsService from './src/modules/usersPosts/usersPosts.service'
import UsersPostsRepository from './src/modules/usersPosts/usersPosts.repository'
import PostsService from './src/modules/posts/posts.service'
import PostsRepository from './src/modules/posts/posts.repository'

const UserModel = representation.UserModel
const PostModel = representation.PostModel
const UserPostModel = representation.UserPostModel

const usersService = container.resolve(UsersService)
const usersRepository = container.resolve(UsersRepository)
const usersPostsService = container.resolve(UsersPostsService)
const usersPostsRepository = container.resolve(UsersPostsRepository)
const postsService = container.resolve(PostsService)
const postsRepository = container.resolve(PostsRepository)

export {
  connectDb,
  UserModel,
  usersService,
  usersRepository,
  UserPostModel,
  usersPostsService,
  usersPostsRepository,
  PostModel,
  postsService,
  postsRepository,
  AppError,
  ErrorCode,
  handleError,
  response
}