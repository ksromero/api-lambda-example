import mongoose from 'mongoose'
import { PostModel } from '@ksr/shared'
import { handler as getAllPostsHandler } from '../src/getAllPosts'
import { handler as createPostHandler } from '../src/createPost'
import { postsService } from '@ksr/shared'
import { APIGatewayProxyResult } from 'aws-lambda'

export const postSuite = () => {
  describe('Post tests', () => {
    beforeAll(async () => {
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

    it('cannot create post - if empty object', async () => {
      const response = await createPostHandler(
        {} as any,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)
      
      expect(response.statusCode).toEqual(400)
      expect(parse.details).toHaveLength(2)
      expect(parse).toMatchObject({
        details: [
          {
            message: '"title" is required',
            path: [ 'title' ],
            type: 'any.required',
            context: { label: 'title', key: 'title' }
          },
          {
            message: '"description" is required',
            path: [ 'description' ],
            type: 'any.required',
            context: { label: 'description', key: 'description' }
          }
        ],
        code: 400
      })
    })

    it('can create post', async () => {
      const event = {
        body: "{\"title\":\"testtitle\",\"description\":\"testdescription\"}"
      } as any

      const response = await createPostHandler(
        event,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)

      expect(response.statusCode).toEqual(200)
      expect(parse.details.title).toEqual('testtitle')
      expect(parse.details.description).toEqual('testdescription')
    })

    it('can get all posts', async () => {
      const response = await getAllPostsHandler(
        {} as any,
        {} as any,
        () => {}
      ) as APIGatewayProxyResult

      const parse = JSON.parse(response.body)

      expect(response.statusCode).toEqual(200)
      expect(parse.details).toHaveLength(4)
    })

    it('can throw error | get all posts', async () => {
      jest.spyOn(postsService, 'getAllPosts').mockImplementation(() => {throw new Error('test 123')})

      const response = await getAllPostsHandler(
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
