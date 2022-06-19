import { dbConnect, dbDisconnect } from './mocks/dbConnect'
import { usersSuite } from './users'
import * as utils from '@ksr/shared'

describe('run integration test sequentially', () => {
  beforeAll(async () => {
    jest.spyOn(utils, 'connectDb').mockImplementation(async test => Promise.resolve(test))
    await dbConnect()
  })
  afterAll(async () => {
    await dbDisconnect()
    jest.clearAllMocks()
  })

  usersSuite()
})
