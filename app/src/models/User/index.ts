import { Schema, model} from 'mongoose'

const schema = new Schema({ 
    firstName: String,
    lastName: String,
    email: { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
      }
 });

export const User = model('User', schema);
