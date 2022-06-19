import mongoose from 'mongoose'
import { PostModel, postsService } from '../index'

export const postsSuite = () => {
  describe('Posts tests', () => {
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

    it('can get all posts', async () => {
      const posts = await postsService.getAllPosts()

      expect(posts).toHaveLength(3)
      expect(Array.isArray(posts)).toEqual(true)
    })

    it('can create post', async () => {
      const post = await postsService.createPost('test title', 'test description')

      expect(post.title).toEqual('test title')
      expect(post.description).toEqual('test description')
    })
  })
}
