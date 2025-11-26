import express , { Request , Response } from 'express' ; 
import { prisma  } from '../lib/prisma' ;
import { createTaskSchema } from '../validators/tasks';


export const getTasks = async ( req : Request , res : Response ) => {
    try {
        const task = await prisma.task.findMany() ; 
        res.status( 200 ).json( task ) ;
    } 
    catch( err ) {
        res.status( 400 ) ; 
    }
}


export const getTaskById = async ( req : Request , res : Response ) => {
    try {
        const id = parseInt( req.params.id , 10 ) ; 
        const task = await prisma.task.findUnique({
            where : { id } 
        }) ; 
        res.status( 200 ).json( task ) ;
    } 
    catch( err ) {
        res.status( 400 ) ; 
    }
}

export const createTask = async ( req : Request , res : Response ) => {
    try {
        const data = createTaskSchema.parse( req.body ) ; 
        const task = await prisma.task.create( { data } ) ; 
        res.status( 201 ).json( task ) ; 
    }
    catch( err ) {
        res.status( 400 ) ;
    }
}