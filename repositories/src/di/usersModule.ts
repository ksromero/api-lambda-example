import { UserModel } from '../modules'
import { ContainerModule } from 'inversify'
import UsersService from '../modules/users/users.service'
import UsersRepository from '../modules/users/users.repository'


const usersModule = new ContainerModule(bind => {
  bind<UsersService>(UsersService).toSelf()
  bind<UsersRepository>(UsersRepository).toSelf()
  bind<typeof UserModel>(UserModel).toFunction(UserModel)
})

export default usersModule
