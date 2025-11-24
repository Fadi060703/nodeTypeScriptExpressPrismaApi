import express , { Request , Response } from 'express' ;
import { prisma } from './lib/prisma' ;
import router from './router/router';
const app = express() ; 
const port = 3000 ; 

app.use( express.json() ) ;  
app.use( '/api' , router ) ; 

app.listen( port , () => {
    console.log( "Started" ) ; 
}) ; 
