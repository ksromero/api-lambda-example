import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import UserPost from '../usersPosts/UserPost'

@modelOptions({ schemaOptions: { collection: 'users' } })
export default class User extends TimeStamps {
  @prop({ required: true })
  name!: string

  @prop({ required: true, default: 5 })
  dailyLimit!: number

  @prop({ ref: () => UserPost })
  userPosts?: Ref<UserPost>[]
}
