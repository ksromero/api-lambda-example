import { injectable } from 'inversify';
import UsersRepository from './users.repository'
import { ErrorCode, AppError } from '../../shared/app.error'

@injectable()
class UsersService {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async getAllUsers() {
    return await this.usersRepository.find().populate({
      path: 'userPosts',
      populate: {
        path: 'posts',
        model: 'Post'
      } 
    }).lean()
  }

  async createUser(name: string, dailyLimit: number) {
    const checkUser = await this.usersRepository.findOne({ name })

    if (checkUser !== null) {
      throw new AppError(ErrorCode.OK, 'User already exist')
    }

    const create = await this.usersRepository.insert({ name, dailyLimit })

    return create
  }
}

export default UsersService