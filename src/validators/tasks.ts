import { z } from 'zod' ; 
import { baseTaskSchema } from './shared';
import { getProjectSchema } from './project';

export const getTasksSchema = baseTaskSchema ; 

export const getTaskSchema = baseTaskSchema.extend({
    description : z.string().min( 3 ) , 
    project : getProjectSchema
}) ;

export const createTaskSchema = z.object({
    title : z.string().min( 3 ) , 
    description : z.string().min( 3 ) , 
    projectId : z.number().positive() , 
}) ;

export type getTasksDTO = z.infer< typeof getTasksSchema > ; 
export type getTaskDTO = z.infer< typeof getTaskSchema > ; 
export type createTaskDTO = z.infer< typeof createTaskSchema > ; 