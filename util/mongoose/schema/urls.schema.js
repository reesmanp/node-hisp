import { Schema, Model } from 'mongoose';

export const Url = new Schema({
  url: { // URI string
    type: String,
    required: true,
    unique: true
  }
});

export default Model(Url);
