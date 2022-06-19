import { UserPostModel } from '../'
import { inject, injectable } from 'inversify'
import { ReturnModelType } from '@typegoose/typegoose'
import BaseRepo from '../../shared/base.repository'
import mongoose from 'mongoose'

@injectable()
class UsersPostsRepository extends BaseRepo<typeof UserPostModel>{

  public userPostModel: ReturnModelType<typeof UserPostModel>

  constructor(@inject(UserPostModel) userPostModel: ReturnModelType<typeof UserPostModel>) {
    super(userPostModel)
  }

  async getPostsCountOfUser(
    userId: mongoose.Types.ObjectId,
    start: Date = new Date(),
    end: Date = new Date()
  ) {
    start.setHours(0,0,0,0)
    end.setHours(23,59,59,999)

    return this.entityModel.aggregate([
      {
        '$facet': {
          count: [
            { $match: { userId } },
            {
              $group: {
                _id: '$userId',
                count: {
                  $sum: {
                    $size: '$posts'
                  }
                }
              }
            }
          ]
        }
      },
      {
        $project: {
          count: {
            $ifNull: [ { $arrayElemAt: [ '$count.count', 0 ] }, 0 ]
          }
        }
      }
    ])
  } 
}

export default UsersPostsRepository