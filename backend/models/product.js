
import { model, Schema } from 'mongoose'

const productSchema = new Schema({
  name: {type:String,required:true},
  description: {type:String,required:true},
  sizes:{type:Array},
  price:{type:String,required:true},
},{timestamps:true})
export default model('product',productSchema);  