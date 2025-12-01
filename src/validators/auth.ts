import { z } from 'zod' ; 
import { AccTypeSchema } from './accType';

export const signUpSchema = z.object({
    email : z.string() ,
    password : z.string().min( 8 , "Password Must Be 8 or More Chars" ) ,
    accountType : AccTypeSchema  , 
    teams : z.array( z.int().positive() ).optional()
})

export type signUpDTO = z.infer< typeof signUpSchema > ;