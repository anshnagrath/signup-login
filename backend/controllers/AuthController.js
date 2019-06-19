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
    let mailStatus = await mailer(req.body.user.email,"confirmation of account",`Please click on the link to confirm the account ${link}`);
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
static async authenticateUser(req, res) {
  if(req.body.email && req.body.password ){
    let user = await user.findOne({email:req.body.email}); 
    if(user.active  == true ){
      let compare = await bcrypt.compare(req.body.password , user.password);
      if(compare)  res.status(200).send(responseObj(200,'ok',true));  
      res.status(400).send(responseObj(400,'user not found',false)); 

    }
   }
  }
  static async verifyUser(req, res) {
    if(req.query && 'id' in req.query ){
     
  
      const userIdHash = req.query.id.toString();
      const alreadyVerified =  `<!DOCTYPE html>
      <script>
      var iMyWidth;
      var iMyHeight
      iMyWidth = (window.screen.width/2) - (75 + 10);
      iMyHeight = (window.screen.height/2) - (100 + 50);
      var win2 = window.open("","Window2","status=no,height=200,width=150,resizable=yes,left=" + iMyWidth + ",top=" + iMyHeight + ",screenX=" + iMyWidth + ",screenY=" + iMyHeight + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
       win2.document.write('<html><head><title>verification</title><body><div style="text-align: center"> <p>Already Registered</p></div></body></html>');
   
      </script>
      <html>
          <div style="text-align: center">
              <p>you are already registered</p>
          </div>
      </html>
      `
      const mailString = 
      `<!DOCTYPE html>
      <script>
      var iMyWidth;
      var iMyHeight
      iMyWidth = (window.screen.width/2) - (75 + 10);
      iMyHeight = (window.screen.height/2) - (100 + 50);
      var win2 = window.open("","Window2","status=no,height=200,width=150,resizable=yes,left=" + iMyWidth + ",top=" + iMyHeight + ",screenX=" + iMyWidth + ",screenY=" + iMyHeight + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
       win2.document.write('<html><head><title>verification</title><body><div style="text-align: center"> <p>Your account has been activated</p></div></body></html>');
   
      </script>
      <html>
          <div style="text-align: center">
              <p>You are Verified Please login to proceed</p>
          </div>
      </html>
      `
      const mailErrorString = `<!DOCTYPE html>
      <script>
      var iMyWidth;
      var iMyHeight
      iMyWidth = (window.screen.width/2) - (75 + 10);
      iMyHeight = (window.screen.height/2) - (100 + 50);
      var win2 = window.open("","","status=no,height=200,width=150,resizable=yes,left=" + iMyWidth + ",top=" + iMyHeight + ",screenX=" + iMyWidth + ",screenY=" + iMyHeight + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
       win2.document.write('<html><head><title>verification</title><body><div style="text-align: center"> <p>Email Not verified Please try again</p></div></body></html>');
   
      </script>
      <html>
          <div style="text-align: center">
              <p>You are not Verified Please try again</p>
          </div>
      </html>
      `
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
        res.status(200).send(alreadyVerified);
      }
     
    }
  }
 
}
export default AuthController;
