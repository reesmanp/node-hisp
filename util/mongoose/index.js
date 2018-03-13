import mongoose from './mongoose';
import DomainModel from './schema/domains.schema';
import JWTModel from './schema/jwt.schema';
import KeyModel from './schema/keys.schema';
import UrlModel from './schema/urls.schema';
import UserModel from './schema/users.schema';

export {
  DomainModel,
  JWTModel,
  KeyModel,
  UrlModel,
  UserModel
};

export default mongoose;
