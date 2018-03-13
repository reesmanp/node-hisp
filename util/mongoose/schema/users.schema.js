import { Schema, Model } from 'mongoose';
import { generate } from 'randomstring';

export const User = new Schema({
  username: { // Hashed username
    type: String,
    required: true,
    unique: true
  },
  password: { // Hashed password
    type: String,
    required: true
  },
  salt: { // Salt
    type: String,
    unique: true,
    default: generate(16)
  },
  email: { // Hashed email
    type: String,
    required: true
  }
});

export default Model(User);
