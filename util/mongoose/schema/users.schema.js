import { Schema, Model } from 'mongoose';
import { generate } from 'randomstring';

export const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    unique: true,
    default: generate(16)
  },
  email: {
    type: String,
    required: true
  }
});

export default Model(User);
