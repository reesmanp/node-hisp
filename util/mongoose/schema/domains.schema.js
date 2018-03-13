import mongoose, { Schema } from 'mongoose';
import { Key } from './keys.schema';
import { Url } from './urls.schema';

export const Domain = new Schema({
  name: { // Unique name for domain
    type: String,
    required: true,
    unique: true
  },
  urls: [Url], // List of URIs associated with the domain
  keys: [Key]  // List of keys associated with the domain
});

export default mongoose.model('Domain', Domain);
