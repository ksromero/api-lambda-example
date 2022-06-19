import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import { connectDb, usersPostsService, response, handleError } from '@ksr/shared'

const uri = '' // mongodb uri

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (_event, _context, _callback) => {
  try {
    await connectDb(uri)

    const users = usersPostsService.getAllUsersPosts()
  
    return response({
      details: await users,
      code: 200
    })
  } catch (error) {
    return handleError(error)
  }
}
