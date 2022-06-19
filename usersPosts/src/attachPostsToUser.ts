import Joi from 'joi'
import { connectDb, response, usersPostsService, handleError } from '@ksr/shared'
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'

const uri = '' // mongodb uri

const validateRequest = async (body: string) => {
  const schema =
    Joi.object({
      userId: Joi.string().required(),
      posts: Joi.array().items(Joi.string())
    }).required()

    return await schema.validateAsync(body, {
      abortEarly: false
    })
}

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event, _context, _callback) => {
  try {
    await connectDb(uri)

    const { userId, posts }: {userId: string, posts: string[]} = await validateRequest(JSON.parse(event.body || "{}"))
    const userPost = usersPostsService.attachPostsToUser(userId, posts)

    return response({
      details: await userPost,
      code: 200
    })
  } catch (error) {
    return handleError(error)
  }
}
