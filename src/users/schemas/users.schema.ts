import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
