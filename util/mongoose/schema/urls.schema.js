import { Schema, Model } from 'mongoose';

export const Url = new Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  }
});

export default Model(Url);
