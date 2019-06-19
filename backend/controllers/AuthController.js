import user from '../models/user';
import  responseObj from '../utility/responseObject';
import log from '../utility/chalk';
import mailer from '../utility/mail';
import  bcrypt  from  'bcrypt';

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
    let mailStatus = await mailer(req.body.user.email,"confirmation of account","Please click on the link to confirm the account");
   console.log(mailStatus,'aaaya')
    mailStatus==true ? res.status(200).send(responseObj(200,'mailSent',null)): res.status(400).send(responseObj(400,'error while sending email',null))
  }else{
    log("error while saving user ",false);
    res.status(400).send(responseObj(401,'error while saving',null))
  } 
 }else{
  res.status(400).send(responseObj(402,'Please provide All the inputs',null))
  }
}
static authenticateUser(req, res) {

  }
  static async verifyUser(req, res) {
    if(req.query && 'verify' in req.query ){
      const userIdHash = req.query.verify.toString();
      const verifiedUser = await user.findOneAndUpdate({userHash:userIdHash},{"active":true},{new:true}).catch((e)=>{log(e)});
      if(verifiedUser.active == true){
        log("user verified ",true); 
        res.jsonp({success : true})
        res.status(200).send(responseObj(200,'userVerified',null))
      }else{
        log("user not updated",false); 
        res.status(200).send(responseObj(400,'user not Verified',null))
      }

    }
  }
 
}
export default AuthController;
