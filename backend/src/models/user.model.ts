import {Schema, model} from 'mongoose';

export interface User{
  id: string;
  email: string;
  password: string;
  username: string;
}

export const UserSchema = new Schema<User>({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
},{
  toJSON:{
    virtuals: true
  },
  toObject:{
    virtuals: true
  },
  timestamps: true
})

export const UserModel = model<User>('user', UserSchema);