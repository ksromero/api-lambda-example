import { ReturnModelType } from '@typegoose/typegoose'
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types'
import { injectable } from 'inversify'
import mongoose, { FilterQuery, UpdateQuery } from 'mongoose'

@injectable()
class BaseRepo<T extends AnyParamConstructor<any>> {
  constructor(protected readonly entityModel: ReturnModelType<T>) {}

  find(filter = {}){
    return this.entityModel.find(filter)
  }

  findById(id: mongoose.Types.ObjectId) {
    return this.entityModel.findById(id)
  }

  findOne(filter: FilterQuery<T>) {
    return this.entityModel.findOne(filter)
  }

  insert(createEntityData: unknown) {
    const entity = new this.entityModel(createEntityData)

    return entity.save()
  }

  delete(id: mongoose.Types.ObjectId) {
    return this.entityModel.findByIdAndDelete(id)
  }

  findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<T>
  ) {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true
      }
    )
  }
}

export default BaseRepo