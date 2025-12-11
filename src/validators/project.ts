import { z } from 'zod' ; 
import { baseProjectSchema } from './shared';
import { getTeamsSchema } from './teams';


export const getProjectsSchema = baseProjectSchema ; 


export const getProjectSchema = baseProjectSchema.extend({
    team : getTeamsSchema
}) ;


export const createProjectSchema = z.object({
    title : z.string().min( 3 ) , 
    tasks : z.array( z.number().positive() ).optional() , 
    teamId : z.number().positive() 
}) ;

export const updateProjectSchema = z.object({
    title : z.string().min( 3 ).optional() , 
    tasks : z.array( z.number().positive() ).optional() , 
    teamId : z.number().positive().optional()
}) ;

export type getProjectsDTO = z.infer< typeof getProjectsSchema > ;
export type createProjectDTO = z.infer< typeof createProjectSchema > ;
export type updateProjectDTO = z.infer< typeof updateProjectSchema > ;