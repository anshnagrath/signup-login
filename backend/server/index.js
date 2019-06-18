import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import chalk from 'chalk';
import mung from 'express-mung'
import bodyParser from 'body-parser';
import {connection} from  '../database/database.js'
import login from '../routes/login.js';
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use(logger('combined'));
app.use('/login',login)
app.listen(3000 || process.env.PORT, () => {
 console.log(`Server started at port  3000 or ${ process.env.PORT}.`);
    
});
console.log("mongoose")

export default app;


