import Joi from 'joi'
import { connectDb, response, usersService, handleError } from '@ksr/shared'
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'

const uri = '' // mongodb uri

const validateRequest = async (body: string) => {
  const schema =
    Joi.object({
      name: Joi.string().required(),
      dailyLimit: Joi.number()
    }).required()

    return await schema.validateAsync(body, {
      abortEarly: false
    })
}

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event, _context, _callback) => {
  try {
    await connectDb(uri)

    const { name, dailyLimit }: {name: string, dailyLimit: number} = await validateRequest(JSON.parse(event.body || "{}"))
    const user = usersService.createUser(name, dailyLimit)

    return response({
      details: await user,
      code: 200
    })
  } catch (error) {
    return handleError(error)
  }
}
