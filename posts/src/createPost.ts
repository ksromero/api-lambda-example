import Joi from 'joi'
import { connectDb, handleError, response, postsService } from '@ksr/shared'
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'

const uri = '' // mongodb uri

const validateRequest = async (body: string) => {
  const schema =
    Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required()
    }).required()

    return await schema.validateAsync(body, {
      abortEarly: false
    })
}

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event, _context, _callback) => {
  try {
    await connectDb(uri)
    const { title, description } = await validateRequest(JSON.parse(event.body || "{}"))

    const post = postsService.createPost(title, description)

    return response({
      details: await post,
      code: 200
    })
  } catch (error) {
    return handleError(error)
  }
}
