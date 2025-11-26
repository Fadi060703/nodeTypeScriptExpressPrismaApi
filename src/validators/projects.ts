import { z } from 'zod' ; 

export const createProjectSchema = z.object({
    title : z.string().min( 2 )  
}) ; 
export type createProjectDTO = z.infer< typeof createProjectSchema > ; 