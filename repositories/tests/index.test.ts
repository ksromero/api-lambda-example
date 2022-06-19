import { dbConnect, dbDisconnect } from './mocks/dbConnect'
import { postsSuite } from './posts'
import { usersSuite } from './users'
import { usersPostsSuite } from './usersPosts'

describe('run integration test sequentially', () => {
  beforeAll(async () => await dbConnect())
  afterAll(async () => await dbDisconnect())
  
  postsSuite()
  usersSuite()
  usersPostsSuite()
})
