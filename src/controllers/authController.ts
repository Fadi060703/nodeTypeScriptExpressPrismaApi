import { Request , Response } from "express" ; 
import bcrypt from 'bcrypt' ; 
import jwt from 'jsonwebtoken' ; 
import { prisma } from "../lib/prisma" ; 
import { JWT_SECRET , JWT_EXPIRES_IN , SALT_ROUNDS } from "../config/auth" ; 
import { signUpSchema } from "../validators/auth";

export const signUp = async ( req : Request , res : Response ) => {
    try{
        const { email , password } = req.body ; 
        const exist = await prisma.user.findUnique({
            where : { email } 
        }) ; 
        if ( exist ) {
            return res.status( 400 ).json( { error : "User exists" } ) ; 
        }
        const hashedPassword = await bcrypt.hash( password , SALT_ROUNDS ) ;
        const user = await prisma.user.create({
            data : { email , password : hashedPassword } 
        }) ; 
        const { password : _ , ...userWithoutPass } = user ;
        res.status( 201 ).json( userWithoutPass ) ;
    }
    catch( err ) {
        res.json( 400 ) ;
    }
} 

 
export const login = async ( req : Request , res : Response ) => {
    try {
        const { email , password } = req.body ; 
        const user = await prisma.user.findUnique({
            where : { email }
        }) ;
        if( !user ) {
            return res.status( 403 ) ; 
        }
        const isValid = await bcrypt.compare( password , user.password ) ;
        if( !isValid ) {
            return res.status( 403 ) ;
        }
        const token = jwt.sign(
            { id : user.id , email : user.email } ,
            JWT_SECRET , 
            { expiresIn : "1d" } 
        ) ; 

        const { password : _ , ...userWithoutPass } = user ;
        res.status( 200 ).json( { 
            userWithoutPass , 
            token
        } ) ; 
    }
    catch( err ){
        res.status( 400 ) ;
    }
}