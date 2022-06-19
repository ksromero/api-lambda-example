import mongoose from 'mongoose'
import { AppError, usersPostsService } from '../index'

export const usersPostsSuite = () => {
  describe('Users Posts tests', () => {
    it('can attach posts to user', async () => {
      const userId =  '5a934e000102030405000000'
      const attachPostsToUser = await usersPostsService.attachPostsToUser(
        userId,
        ['629eac90bfaba07a8845d99f', '629eac90bfaba07a8845d9a0']
      )

      expect(attachPostsToUser.userId).toEqual(new mongoose.Types.ObjectId(userId))
      expect(attachPostsToUser.posts).toHaveLength(2)
    })

    it('can throw error if limit is reach', async () => {
      try {
        await usersPostsService.attachPostsToUser(
          '5a934e000102030405000000',
          ['629eb22c98df1015e980a995']
        )
      } catch (err) {
        expect(err.message).toEqual('User has reached the daily limit of posts!')
        expect(err).toBeInstanceOf(AppError)
      }
    })

    it('can throw error if posts is greater than limit', async () => {
      try {
        await usersPostsService.attachPostsToUser(
          '629eb22698df1015e980a98f',
          ['629eac90bfaba07a8845d99f', '629eac90bfaba07a8845d9a0', '629eb22c98df1015e980a995']
        )

      } catch (err) {
        expect(err.message).toEqual(`User has posts daily limit of 2 and has only a remaining posts of 2`)
        expect(err).toBeInstanceOf(AppError)
      }
    })

    it('can get all users posts', async () => {
      const usersPosts = await usersPostsService.getAllUsersPosts()
      
      expect(usersPosts).toHaveLength(1)
    })

    it('can throw error if user does not exist | checkUserPostsLimit', async () => {
      try {
        await usersPostsService.checkUserPostsLimit(new mongoose.Types.ObjectId('5d6ede6a0ba62570afcedd3a'))

      } catch (err) {
        expect(err.message).toEqual(`User doesn't exist`)
        expect(err).toBeInstanceOf(AppError)
      }
    })

    it('can throw error if posts ids is not existing | attachPostsToUser', async () => {
      try {
        await usersPostsService.attachPostsToUser(
          '629eb22698df1015e980a98f',
          ['5a934e000102030405000002', '5a934e000102030405000003']
        )
      } catch (err) {
        expect(err.message).toEqual(`Posts id's doesn't exists`)
        expect(err).toBeInstanceOf(AppError)
      }
    })
  })
}
