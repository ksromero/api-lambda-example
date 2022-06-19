import { UserModel } from '../'
import { inject, injectable } from 'inversify'
import { ReturnModelType } from '@typegoose/typegoose'
import BaseRepo from '../../shared/base.repository'
import mongoose from 'mongoose'

@injectable()
class UsersRepository extends BaseRepo<typeof UserModel>{

  public userModel: ReturnModelType<typeof UserModel>

  constructor(@inject(UserModel) userModel: ReturnModelType<typeof UserModel>) {
    super(userModel)
  }

  async pushUsersPostsToUser(userId: mongoose.Types.ObjectId, userPostsId: string) {
    return this.findOneAndUpdate(
      { _id: userId },
      { $push: { userPosts: userPostsId } }
    )
  }
}

export default UsersRepository