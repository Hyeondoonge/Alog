import mongoose from 'mongoose';
// 🐲 필요하면 Schema 생성시 options 추가 할 수 있음 (autoIndex, autoCreate, ...)

// _id는 default로 등록됨.

// postSchema.set('validateBeforeSave', true);

export default mongoose.model('Like', new mongoose.Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true }, 
  })
);