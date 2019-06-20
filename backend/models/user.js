
import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: {type:String,required:true},
  lastName: {type:String,required:true},
  email: {type:String,required:true},
  password:{type:String,required:true },
  active:{type:Boolean,default:false},
  userHash:{type:String},
  selectedProduct:{type:Array}
},{timestamps:true})
export default model('user',userSchema);  