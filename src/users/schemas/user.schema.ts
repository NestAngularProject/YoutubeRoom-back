import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  mail: {
    type: String,
    required: true,
    trim: true,
  },
  room: {
    type: String,
    trim: true,
  },
}, {
  toJSON: {virtuals: true},
  versionKey: false,
})
