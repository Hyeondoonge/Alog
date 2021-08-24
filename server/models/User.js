import mongoose from 'mongoose';

export default mongoose.model('User', new mongoose.Schema({
    nickname: { type: String, required: true }
  })
);