import { z } from 'zod' ; 

export const getTeamsSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string(),
  userIds: z.array(z.number().int().nonnegative()).default([]),
  projectIds: z.array(z.number().int().nonnegative()).default([]),
});

export const createTeamSchema = z.object({
    name : z.string() , 
    userIds : z.array( z.number().int().positive() ).optional() , 
    projectIds : z.array( z.number().int().positive() ).optional() 
}) ;

export type getTeamsDTO = z.infer< typeof getTeamsSchema > ;
export type createTeamDTO = z.infer< typeof createTeamSchema > ; 