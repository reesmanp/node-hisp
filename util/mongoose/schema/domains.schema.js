import { Schema, Model } from 'mongoose';
import { Key } from './keys.schema';
import { Url } from './urls.schema';

export const Domain = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  urls: [Url],
  keys: [Key]
});

export default Model(Domain);
