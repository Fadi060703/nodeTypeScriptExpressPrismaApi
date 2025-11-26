import { z } from 'zod' ; 

export const signUpSchema = z.object({
    email : z.string() ,
    password : z.string().min( 8 , "Password Must Be 8 or More Chars" )  
})

export type signUpDTO = z.infer< typeof signUpSchema > ;