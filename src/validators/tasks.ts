import { z } from 'zod' ;


export const createTaskSchema = z.object({
    title : z.string().min( 1 , "Title is required" ) , 
    description : z.string().min( 1 , "Description is required" ) ,
    projectId : z.number().int().positive( "Project ID must be valid" )  
}) ;


export type createTaskDTO = z.infer< typeof createTaskSchema > ; 