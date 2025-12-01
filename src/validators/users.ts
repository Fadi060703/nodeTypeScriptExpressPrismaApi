import { email, z } from 'zod' ; 
import { AccTypeSchema } from './accType';
import { baseUserSchema , baseTeamSchema } from './shared';

export const getUsersSchema = baseUserSchema

export const getUserSchema = baseUserSchema.extend({
    team : z.array( baseTeamSchema ).optional() 
}) ;

export const updateUserSchema = z.object({
    id : z.int().positive().optional() , 
    email : z.email().optional() , 
    accountType : AccTypeSchema.optional() , 
    addTeams : z.array( z.int().positive() ).optional() , 
    remTeams : z.array( z.int().positive() ).optional() , 
    chgTeams : z.array( z.int().positive() ).optional()
}) ; 

export type getUsersDTO = z.infer< typeof getUsersSchema > ; 
export type getUserDTO = z.infer< typeof getUserSchema > ; 
export type updateUserDTO = z.infer< typeof updateUserSchema > ; 