import mongoose from 'mongoose';

export default mongoose.model('User', new mongoose.Schema({
    userId: { type: String, required: true },
    userNumber: { type: Number, required: true },
    platform: { type: String, required: true },
    profilePath: { type: String },
    signupDate: { type: Date, default: Date.now, required: true },
    description: { type: String }
  })
);