import { z } from 'zod' ; 

export const createProjectSchema = z.object({
    title : z.string().min( 2 ) ,
    teamId :z.number().int().positive()
}) ; 
export type createProjectDTO = z.infer< typeof createProjectSchema > ; 