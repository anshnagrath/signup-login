
import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: {type:String,required:true},
  lastName: {type:String,requires:true},
  email: {type:String,required:true},
  password:{type:String,required:true}
},{timestamps:true})

export default model('user',userSchema);