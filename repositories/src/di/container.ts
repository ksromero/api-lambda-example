import { Container } from 'inversify'
import usersModule from './usersModule'
import usersPostsModule from './usersPostsModule'
import postsModule from './postsModule'

const container = new Container()

container
  .load(
    usersModule,
    usersPostsModule,
    postsModule
  )

export default container