import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    required: true
  })
  username: string;

  @Prop({
    type: String,
    required: true
  })
  firstName: string;

  @Prop({
    type: String,
    required: true
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    type: String,
    required: false,
    unique: true
  })
  phone: string;

  @Prop({
    type: String,
    required: false
  })
  city: string;

  @Prop({
    type: String,
    required: false
  })
  country: string;

  @Prop({
    type: String,
    required: false
  })
  address: string;

  @Prop({
    type: String,
    required: false
  })
  zipCode: string;

  @Prop({
    type: String,
    required: true
  })
  gender: string;

  @Prop({
    type: String,
    required: true,
    default: 'https://cdn0.iconfinder.com/data/icons/professional-avatar-5/48/manager_male_avatar_men_character_professions-512.png'
  })
  avatar: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false
  })
  archived: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
