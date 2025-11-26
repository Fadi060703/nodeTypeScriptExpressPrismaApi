import express , { Request , Response } from 'express' ; 
import { prisma  } from '../lib/prisma' ;
import { createProjectSchema } from '../validators/projects';

export const getProjects = async ( req : Request , res : Response ) => {
    try{
        const projects = await prisma.project.findMany() ; 
        res.status( 200 ).json( projects ) ;
    }
    catch( err ) {
        res.status( 400 ) ;
    }
}

export const getProjectById = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ;
        const project = await prisma.project.findUnique({
            where : { id },
            include : { tasks : true } 
        }) ;
        res.status( 200 ).json( project ) ;
    } 
    catch( err ) {
        res.status( 400 ) ; 
    }
}

export const createProject = async ( req : Request , res : Response ) => {
    try{
        const data = createProjectSchema.parse( req.body ) ; 
        const project = await prisma.project.create( { data } ) ; 
        res.status( 201 ).json( project ) ;
    }
    catch( err ) {
        res.status( 400 ) ;
    }
}