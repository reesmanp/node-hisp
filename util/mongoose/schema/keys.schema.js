import { Schema, Model } from 'mongoose';

export const Key = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  domain: {
    type: String,
    required: true
  }
});

export default Model(Key);
