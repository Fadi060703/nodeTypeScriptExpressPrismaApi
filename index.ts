import express , { Request , Response } from 'express' ;
import router from './src/router/router';
const app = express() ;
const path = '0.0.0.0' ;  
const port = 3000 ; 

app.use( express.json() ) ;  
app.use( '/api' , router ) ; 

app.listen(  port , path , () => {
    console.log( "Started" ) ; 
}) ; 
