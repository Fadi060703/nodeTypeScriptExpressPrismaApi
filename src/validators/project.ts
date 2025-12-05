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

export type getProjectsDTO = z.infer< typeof getProjectsSchema > ;
export type createProjectDTO = z.infer< typeof createProjectSchema > ;