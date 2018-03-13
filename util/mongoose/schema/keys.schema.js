import mongoose, { Schema } from 'mongoose';

export const Key = new Schema({
  name: { // Unique key name
    type: String,
    required: true,
    unique: true
  },
  isPrivate: { // Is a private or a public key
    type: Boolean,
    default: false
  },
  domain: { // Domain the key belongs to
    type: String,
    required: true
  }
});

export default mongoose.model('Key', Key);
