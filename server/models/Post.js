import mongoose from 'mongoose';
import User from './User.js';

// 🐲 필요하면 Schema 생성시 options 추가 할 수 있음 (autoIndex, autoCreate, ...)

// _id는 default로 등록됨.

// postSchema.set('validateBeforeSave', true);

export default mongoose.model('Post', new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  subtitle: { type: String },
  language:{ type: String },
  content: {
    type: String,
    required: true,
    minLength: [10, 'Too short content'],
  },
  writerId: { type: String, ref: User, required: true }, 
  writeDate: { type: Date, default: Date.now, required: true },
  })
);