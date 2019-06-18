import mongoose from 'mongoose';
const connection = mongoose.connect('mongodb://localhost/devdb',{ useNewUrlParser: true }).then(console.log("connected to db")).catch(console.error);
export default {connection,mongoose}