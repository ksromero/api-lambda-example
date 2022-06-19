import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import Post from '../posts/Post'
import mongoose from 'mongoose'

@modelOptions({ schemaOptions: { collection: 'users_posts' } })
export default class UserPost extends TimeStamps {
  @prop({ required: true })
  userId!: mongoose.Types.ObjectId

  @prop({ ref: () => Post })
  posts?: Ref<Post>[]
}
