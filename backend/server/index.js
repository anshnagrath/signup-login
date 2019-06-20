import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import log from '../utility/chalk'
import routes from '../routes/routes'
import mung from 'express-mung'
import bodyParser from 'body-parser';
import {connection} from  '../database/database'
const app = express();
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Expose-Headers", "*"); 
    next();
 }) 
app.use(bodyParser.json({limit: '5mb'}));
app.use(logger('dev'));
app.use(routes);

app.listen(process.env.PORT || 3000 , (err) => {
 if(!err) {
     log(`Server started at port  ${ process.env.PORT?process.env.PORT:'3000'}.`,true);
    }else{  
        log(`Error While starting server`,false);
    }
});


export default app;


