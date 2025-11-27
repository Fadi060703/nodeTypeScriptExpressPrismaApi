import { z } from 'zod' ; 

export const getProjectSchema = z.object({
    id : z.number() , 
    title : z.string() 
}) ;

export const createProjectSchema = z.object({
    title : z.string().min( 2 ) ,
    teamId :z.number().int().positive()
}) ; 

export type getProjectSchemaDTO = z.infer< typeof getProjectSchema > ;
export type createProjectDTO = z.infer< typeof createProjectSchema > ; 