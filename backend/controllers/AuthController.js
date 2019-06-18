import user from '../models/user';
import  responseObj from '../utility/responseObject';
import log from '../utility/chalk';
import mailer from '../utility/mail';
class AuthController {
static async createUser(req, res) {
 if(req.body && req.body.firstName && req.body.lastName && req.body.email&& req.body.password){
  const userInstance = new user(req.body.user)
  const savedUser = await userInstance.save();
  if(savedUser){
    log("user sucessfully saved",true); 
    let mailStatus =  mailer(req.body.email,"confirmation of account","Please click on the link to confirm the account");
    mailStatus ? responseObj(200,'mailSent',null): responseObj(400,'error while sending email',null)
       
  }else{
    log("error while saving user ",false);
    responseObj(400,'failed to save details',null)
  } 
 }else{
  responseObj(400,'failed to save details',null)
 }
    // const newId = parseInt(Posts.length) + 1;
    // const { title, body } = req.body;
    // const newPost = {
    //   id: newId,
    //   title,
    //   body,
    //   created_at: moment.utc().format()
    // };
    // Posts.push(newPost);
    // return res.status(200).json({
    //   message: "created a new post"
    // });
  }
static authenticateUser(req, res) {
    // const { id } = req.params;
    // const post = Posts.find(onePost => onePost.id == id);
    // if (post) {
    //   return res.status(200).json({
    //     message: "one post found",
    //     onePost: post
    //   });
    // } else {
    //   res.status(400).json({
    //     error: "no post found with that id"
    //   });
    // }
  }
 
}
export default AuthController;
