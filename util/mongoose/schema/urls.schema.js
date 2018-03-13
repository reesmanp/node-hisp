import mongoose, { Schema } from 'mongoose';

export const Url = new Schema({
  url: { // URI string
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model('URL', Url);
