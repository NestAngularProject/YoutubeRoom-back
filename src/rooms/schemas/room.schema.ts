import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  currentVideoID: {
    type: String,
    trim: true,
  },
}, {
  toJSON: {virtuals: true},
  versionKey: false,
})
