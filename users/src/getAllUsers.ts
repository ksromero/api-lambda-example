import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import { connectDb, usersService, response, handleError } from '@ksr/shared'

const uri = '' // mongodb uri

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (_event, _context, _callback) => {
  try {
    await connectDb(uri)

    const users = usersService.getAllUsers()
  
    return response({
      details: await users,
      code: 200
    })
  } catch (error) {
    return handleError(error)
  }
}
