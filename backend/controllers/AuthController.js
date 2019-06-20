import user from '../models/user';
import  responseObj from '../utility/responseObject';
import log from '../utility/chalk';
import mailer from '../utility/mail';
import  bcrypt  from  'bcrypt';
import jwt from 'jsonwebtoken';
import product from '../models/product';
import {secret} from '../utility/config';
import {alreadyVerified,mailString,mailErrorString} from '../public/htmlStrings/servehtml';

class AuthController {
static async createUser(req, res) {
 if(req.body && req.body.user.firstName && req.body.user.lastName && req.body.user.email&& req.body.user.password){
  const hash = await bcrypt.hash( req.body.user.password ,10);
  req.body.user.password = hash;
  const userInstance = new user(req.body.user)
  console.log("userinstance",userInstance)
  const userIdHash = await bcrypt.hash( userInstance._id.toString() ,10);
   userInstance['userHash'] = userIdHash;
  const savedUser = await userInstance.save();
  if(savedUser){
    log("user sucessfully saved " + req.protocol+req.get('host'),true); 
    const link = req.protocol+'://'+ req.get('host')+"/verify?id=" + userIdHash;
    let mailStatus = await mailer(req.body.user.email,"confirmation of account",`Please click on the link to confirm the account ${link}`);
   console.log(mailStatus,'aaaya')
    mailStatus==true ? res.status(200).send(responseObj(200,'mailSent',null)): res.status(400).send(responseObj(400,'error while sending email',null))
  }else{
    log("error while saving user ",false);
    res.status(400).send(responseObj(401,'error while saving',null))
  } 
 }else{
  res.status(500).send(responseObj(402,'Please provide All the inputs',null))
  }
}
static async authenticateUser(req, res) {
  if(req.body.email && req.body.password ){
    let user = await user.findOne({email:req.body.email}); 
    if(user.active  == true ){
      let compare = await bcrypt.compare(req.body.password , user.password);
      if(compare)  {
        const token = jwt.sign({ userId: user._id }, secret, { algorithm: 'RS256'})
        res.setHeader('x-access-token', token);
        res.status(200).send(responseObj(200,'ok',user));
       } 
       res.status(500).send(responseObj(400,'user not found',null)); 

    }
   }
  }
  static async verifyUser(req, res) {
    if(req.query && 'id' in req.query ){
      const userIdHash = req.query.id.toString();
      const isVerified = await user.findOne({userHash:userIdHash}).catch((e)=>{log(e,false)});
      if(!isVerified.active != true){
        const verifiedUser = await user.findOneAndUpdate({userHash:userIdHash},{"active":true},{new:true},{userHash:''}).catch((e)=>{log(e,false)});     
        if(verifiedUser.active == true){
          log("user verified ",true); 
          res.status(200).send(mailString);
        }else{
          log("user not updated",false); 
          res.status(200).send(mailErrorString);
        }
  
      
      }else{
        res.status(500).send(alreadyVerified);
      }
     
    }
  }
  static async addToProductList(req,res){
    if(req.body.products && req.body.userId){
      let currentUser = await user.findOneAndUpdate({_id:req.body.userID},{$set:{selectedProduct:req.body.products}},{new:true});
         if(currentUser){
           log("products Sucessfully Added",true);
             res.status(200).send(responseObj(200,'ok',null)); 
         }else{
             res.status(500).send(responseObj(400,'ok',null)); 
         }
    }
  }
  static async getUserProducts(req,res){
    if(req.params.userId){
      let agregatedData = user.aggregate([
        {$match:{_id:req.params.userId}},
        // { $lookup: { from: "product",localField:'' } }
      ])
    }
  }
 
}
export default AuthController;
