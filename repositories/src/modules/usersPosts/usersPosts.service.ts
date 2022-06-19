import mongoose from 'mongoose'
import { injectable } from 'inversify'
import { intersecArrNotInc } from '../../shared/utils'
import { ErrorCode, AppError } from '../../shared/app.error'
import UsersRepository from '../users/users.repository'
import UsersPostsRepository from '../usersPosts/usersPosts.repository'
import PostsRepository from '../posts/posts.repository'

@injectable()
class UsersPostsService {
  private usersPostsRepository: UsersPostsRepository
  private usersRepository: UsersRepository
  private postsRepository: PostsRepository

  constructor(
    usersPostsRepository: UsersPostsRepository,
    usersRepository: UsersRepository,
    postsRepository: PostsRepository
  ) {
    this.usersPostsRepository = usersPostsRepository
    this.usersRepository = usersRepository
    this.postsRepository = postsRepository
  }

  async getAllUsersPosts() {
    return await this.usersPostsRepository.find().populate('posts').lean()
  }

  async checkUserPostsLimit(userId: mongoose.Types.ObjectId) {
    const user = await this.usersRepository.findById(userId)

    if (user === null) {
      throw new AppError(ErrorCode.OK, `User doesn't exist`)
    }

    const [postCt] = await this.usersPostsRepository.getPostsCountOfUser(userId)

    const res = {
      postsRemaining: user.dailyLimit - postCt.count,
      dailyLimit: user.dailyLimit
    }

    if (res.postsRemaining === 0) {
      throw new AppError(
        ErrorCode.OK,
        `User has reached the daily limit of posts!`
      )
    }

    return res
  }

  async attachPostsToUser(userId: string, postsIds: string[]) {
    const userOId = new mongoose.Types.ObjectId(userId)
    const { postsRemaining, dailyLimit } = await this.checkUserPostsLimit(userOId)
    const posts = await this.postsRepository.getPostsWithIds(postsIds)
    const postsIdsToString = posts.map(post => post._id.toString())

    if (postsIdsToString.length === 0) {
      throw new AppError(ErrorCode.OK, `Posts id's doesn't exists`)
    }

    if (postsIdsToString.length > postsRemaining) {
      throw new AppError(
        ErrorCode.OK,
        `User has posts daily limit of ${dailyLimit} and has only a remaining posts of ${ postsRemaining }`
      )
    }

    const postsIdsNotExists = intersecArrNotInc(postsIds, postsIdsToString)
    const create = await this.usersPostsRepository.insert({
      userId,
      posts: postsIdsToString
    })
    await this.usersRepository.pushUsersPostsToUser(userOId, create._id)

    return {
      ...create.toObject(),
      postsIdsNotExists
    }
  }
}

export default UsersPostsService