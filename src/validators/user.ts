import { z } from 'zod' ; 
import { AccTypeSchema } from './accType';
import { getTeamSchema, getTeamsSchema } from './teams';

export const userGetSchema = z.object({
    id : z.number().int() , 
    email : z.email() ,
    accountType : AccTypeSchema , 
}) ;

export const userGetByIdSchema = z.object({
  id : z.number().int() , 
  email : z.email() ,
  accountType : AccTypeSchema , 
  team : z.array( getTeamsSchema ) 
})

export const userCreateSchema = z.object({
    email : z.email() , 
    password : z.string().min( 8 , "Password must be 8 or more chars" ) ,
    accountType : AccTypeSchema , 
    teamIds : z.array( z.number().int().positive() ).optional()
}) ; 

export const userUpdateSchema = z.object({
  email : z.email().optional() ,
  password : z.string().min(8).optional() ,
  accountType : AccTypeSchema.optional() ,
  connectTeamIds : z.array(z.number().int().positive()).optional() ,
  disconnectTeamIds : z.array(z.number().int().positive()).optional() ,
  setTeamIds : z.array(z.number().int().positive()).optional()
}) ;  

export type userGetSchemaDTO = z.infer< typeof userGetSchema > ;
export type userGetByIdSchemaFTO = z.infer< typeof userGetByIdSchema > ;
export type userCreateSchemaDTO = z.infer< typeof userCreateSchema > ;
export type userUpdateSchemaDTO = z.infer< typeof userUpdateSchema >  ;

