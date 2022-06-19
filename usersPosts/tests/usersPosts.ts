import mongoose from 'mongoose'
import { UserModel, PostModel, usersPostsService } from '@ksr/shared'
import { APIGatewayProxyResult } from 'aws-lambda'
import { handler as getAllUsersPostsHandler } from '../src/getAllUsersPosts'
import { handler as attachPostsToUserHandler } from '../src/attachPostsToUser'

export const usersPostsSuite = () => {
  describe('Users Posts tests', () => {
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
      
      await PostModel.insertMany([
        {
          _id: new mongoose.Types.ObjectId('629eac90bfaba07a8845d99f'),
          title: 'test1',
          description: 'desc1'
        },
        {
          _id: new mongoose.Types.ObjectId('629eac90bfaba07a8845d9a0'),
          title: 'test2',
          description: 'desc2'
        },
        {
          _id: new mongoose.Types.ObjectId('629eb22c98df1015e980a995'),
          title: 'test3',
          description: 'desc3'
        }
      ])
    })

    it('can attach posts to user', async () => {
      const event = {
        body : "{\"userId\":\"5a934e000102030405000000\",\"posts\":[\"629eac90bfaba07a8845d99f\",\"629eac90bfaba07a8845d9a0\"]}"
      } as any

      const response = await attachPostsToUserHandler(
        event,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)

      expect(response.statusCode).toEqual(200)
      expect(parse.details.userId).toEqual('5a934e000102030405000000')
      expect(parse.details.posts).toEqual(['629eac90bfaba07a8845d99f', '629eac90bfaba07a8845d9a0'])
    })

    it('can show error if limit is reach', async () => {
      const event = {
        body : "{\"userId\":\"5a934e000102030405000000\",\"posts\":[\"629eb22c98df1015e980a995\"]}"
      } as any

      const response = await attachPostsToUserHandler(
        event,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)

      expect(response.statusCode).toEqual(200)
      expect(parse.details).toEqual('User has reached the daily limit of posts!')
    })

    it('cannot attach posts to user if empty object', async () => {
      const response = await attachPostsToUserHandler(
        {} as any,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)

      expect(response.statusCode).toEqual(400)
      expect(parse).toMatchObject({
        details: [
          {
            message: '"userId" is required',
            path: [ 'userId' ],
            type: 'any.required',
            context: { label: 'userId', key: 'userId' }
          }
        ],
        code: 400
      })
    })

    it('can show error if posts is greater than limit', async () => {
      const event = {
        body : "{\"userId\":\"629eb22698df1015e980a98f\"," + 
              "\"posts\":[\"629eac90bfaba07a8845d99f\", \"629eac90bfaba07a8845d9a0\"," +
              "\"629eb22c98df1015e980a995\"]}"
      } as any

      const response = await attachPostsToUserHandler(
        event,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)

      expect(response.statusCode).toEqual(200)
      expect(parse.details).toEqual('User has posts daily limit of 2 and has only a remaining posts of 2')
    })

    it('can get all users posts', async () => {
      const response = await getAllUsersPostsHandler(
        {} as any,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)
 
      expect(response.statusCode).toEqual(200)
      expect(parse.details).toHaveLength(1)
    })

    it('can handle error | get all users posts', async () => {
      jest.spyOn(usersPostsService, 'getAllUsersPosts').mockImplementation(() => { throw new Error('test 123') })

      const response = await getAllUsersPostsHandler(
        {} as any,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)

      expect(response.statusCode).toEqual(500)
      expect(parse.details).toMatch(/(test 123)/i)
    })
  })
}
