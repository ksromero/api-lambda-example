import mongoose from 'mongoose'
import { UserModel } from '@ksr/shared'
import { handler as getAllUsersHandler } from '../src/getAllUsers'
import { handler as createUserHandler } from '../src/createUser'
import { APIGatewayProxyResult } from 'aws-lambda'
import { usersService } from '@ksr/shared'

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

    it('cannot create user - if empty object', async () => {
      const response = await createUserHandler(
        {} as any,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)
      
      expect(response.statusCode).toEqual(400)
      expect(parse.details).toHaveLength(1)
      expect(parse).toMatchObject({
        details: [
          {
            message: '"name" is required',
            path: [ 'name' ],
            type: 'any.required',
            context: { label: 'name', key: 'name' }
          }
        ],
        code: 400
      })
    })

    it('can create user', async () => {
      const event = {
        body: "{\"name\":\"qqq\",\"dailyLimit\":\"5\"}"
      } as any

      const response = await createUserHandler(
        event,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)

      expect(response.statusCode).toEqual(200)
      expect(parse.details.name).toEqual('qqq')
      expect(parse.details.dailyLimit).toEqual(5)
    })

    it('can get all users', async () => {
      const response = await getAllUsersHandler(
        {} as any,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)

      expect(response.statusCode).toEqual(200)
      expect(parse.details).toHaveLength(3)
    })

    it('can throw error | get all users', async () => {
      jest.spyOn(usersService, 'getAllUsers').mockImplementation(() => {throw new Error('test 123')})

      const response = await getAllUsersHandler(
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
