import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  mail: string;
  room: string;
}
