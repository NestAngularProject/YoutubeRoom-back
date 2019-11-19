import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    match: /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
  },
  timestamp: {
    type: Number,
    trim: true,
  },
  seen: {
    type: Boolean,
    required: true,
    trim: true,
  },
  room: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  toJSON: {virtuals: true},
  versionKey: false,
})
