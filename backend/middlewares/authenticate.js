import jwt from 'jsonwebtoken';
import secret from '../utility/config';
import  responseObj from '../utility/responseObject';
import log from '../utility/chalk';
const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token']; // Express headers are auto converted to lowercase
  if(token){
    try {
        let decoded = jwt.verify(token, secret);
        if(!decoded)  {
            log(`UnAuthorised Entry from ${token}`,false)
            res.status(400).send(responseObj(500,'User access denied',null))
        }else{
            log(`User Authenticated`,true)
            next();
        }

      } catch(err) {
        log(`Error while decoding token`,false)
      }
  }
}
export default checkToken