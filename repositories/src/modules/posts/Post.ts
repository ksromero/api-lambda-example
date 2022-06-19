import { modelOptions, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

@modelOptions({ schemaOptions: { collection: 'posts' } })
export default class Post extends TimeStamps {
  @prop({ required: true })
  title!: string

  @prop()
  description?: string
}
