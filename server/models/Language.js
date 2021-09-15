import mongoose from 'mongoose';

export default mongoose.model('Language', new mongoose.Schema({
  name: { type: String, require: true }
  })
);