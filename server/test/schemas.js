const { Schema } = require("mongoose");

// 🐲 필요하면 Schema 생성시 options 추가 할 수 있음 (autoIndex, autoCreate, ...)

// _id는 default로 등록됨.

const postSchema = new Schema({
  title: { type: String, required: true },
  platform: { type: Number, required: true },
  subtitle: { type: String, required: true },
  language:{ type: Number, required: true },
  content: {
    type: String,
    required: true,
    minLength: [10, 'Too short content'],
  },
  writer: { type: String, ref: User }, 
  date: { type: Date, default: Date.now(), require: true },
});

// postSchema.set('validateBeforeSave', true);

module.exports = { postSchema };