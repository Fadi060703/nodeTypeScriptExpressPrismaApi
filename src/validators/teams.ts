import { z } from 'zod' ;
import { baseUserSchema , baseTeamSchema } from './shared';

export const getTeamsSchema = baseTeamSchema ; 

export const getTeamSchema = baseTeamSchema.extend({
    users : z.array( baseUserSchema )
})

export const createTeamSchema = z.object({
    name : z.string() , 
    users : z.array( z.int().positive() ).optional()
}) ;

export const updateTeamSchema = z.object({
    name : z.string().optional() ,
    addUsers : z.array( z.int().positive() ).optional() ,
    remUsers : z.array( z.int().positive() ).optional() ,
    setUsers : z.array( z.int().positive() ).optional() ,
}) ;


export type getTeamsDTO = z.infer< typeof getTeamsSchema > ; 
export type getTeamDTO = z.infer< typeof getTeamSchema > ; 
export type createTeamDTO = z.infer< typeof createTeamSchema > ; 
export type updateTeamDTO = z.infer< typeof updateTeamSchema > ; 