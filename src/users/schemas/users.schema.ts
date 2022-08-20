import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User {
  @Prop({ unique: true })
  userId: string;

  @Prop()
  name?: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
