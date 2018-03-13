import mongoose, { Schema } from 'mongoose';

export const JWTSchema = new Schema({
  user: { // Username -- hashed
    type: String,
    required: true
  },
  randomString: { // Random String
    type: String,
    required: true,
    unique: true
  },
  originalTime: { // Original Time
    type: Date,
    required: true
  },
  newTime: { // New Time
    type: Date,
    required: true
  },
  ip: { // IP Address
    type: String,
    required: true
  },
  createdAt: { // Created at time with expiry
    type: Date,
    expires: 300,
    default: Date.now
  }
});

export default mongoose.model('JWT', JWTSchema);
