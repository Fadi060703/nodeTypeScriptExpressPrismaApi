import { z } from 'zod' ; 
import { userGetSchema } from './user';
import { getProjectSchema } from './projects';



export const getTeamsSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string(),
  users: z.array( userGetSchema ).default([]),
  projects: z.array( getProjectSchema ).default([]),
});

export const getTeamSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string(),
});

export const createTeamSchema = z.object({
    name : z.string() , 
    userIds : z.array( z.number().int().positive() ).optional() , 
    projectIds : z.array( z.number().int().positive() ).optional() 
}) ;

export type getTeamsDTO = z.infer< typeof getTeamsSchema > ;
export type getTeamFTO = z.infer< typeof getTeamSchema > ;
export type createTeamDTO = z.infer< typeof createTeamSchema > ; 