
import { getModelForClass } from '@typegoose/typegoose'
import UserPost from './usersPosts/UserPost'
import Post from './posts/Post'
import User from './users/User'

const UserModel = getModelForClass(User)
const UserPostModel = getModelForClass(UserPost)
const PostModel = getModelForClass(Post)

export {
  PostModel,
  UserModel,
  UserPostModel
}
