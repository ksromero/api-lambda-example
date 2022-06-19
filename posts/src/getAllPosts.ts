import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import { connectDb, postsService, response, handleError } from '@ksr/shared'

const uri = '' // mongodb uri

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (_event, _context, _callback) => {
  try {
    await connectDb(uri)
    const posts = postsService.getAllPosts()
  
    return response({
      details: await posts,
      code: 200
    })
  } catch (error) {
    return handleError(error)
  }
}
