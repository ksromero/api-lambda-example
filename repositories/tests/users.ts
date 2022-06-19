import mongoose from 'mongoose'
import { UserModel } from '../index'
import { usersService, AppError } from '../index'

export const usersSuite = () => {
  describe('Users tests', () => {
    beforeAll(async () => {
      await UserModel.insertMany([
        {
          _id: new mongoose.Types.ObjectId('5a934e000102030405000000'),
          name: 'user1',
          dailyLimit: 2
        },
        {
          _id: new mongoose.Types.ObjectId('629eb22698df1015e980a98f'),
          name: 'user2',
          dailyLimit: 2
        },
      ])
    })

    it('can get all users', async () => {
      const users = await usersService.getAllUsers()

      expect(users).toHaveLength(2)
      expect(Array.isArray(users)).toEqual(true)
    })

    it('can create user', async () => {
      const user = await usersService.createUser('username', 2)

      expect(user.name).toEqual('username')
      expect(user.dailyLimit).toEqual(2)
    })

    it('cannot create user | throw error', async () => {
      try {
        await usersService.createUser('username', 2)
      } catch (err) {
        expect(err.message).toEqual('User already exist')
        expect(err).toBeInstanceOf(AppError)
      }
    })
  })
}
