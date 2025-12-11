import { Request , Response } from "express" ;
import { prisma } from "../lib/prisma" ; 
import { z } from 'zod' ; 
import { createProjectSchema, getProjectSchema, getProjectsSchema, updateProjectSchema } from "../validators/project";

export const getProjects = async ( req : Request , res : Response ) => {
    try{
        const data = await prisma.project.findMany({}) ; 
        if ( !data ) {
            return res.status( 404 ).json({
                "Error Message" : "No projects"
            }) ; 
        }
        const parsedData =  z.array( getProjectsSchema ).parse( data ) ;
        res.status( 200 ).json( parsedData ) ;
    }catch( err ){
        res.status( 400 ).json( "ERROR" ) ;
    }
}

export const getProjectById = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ;
        const data = await prisma.project.findUnique({
            where : { id } , 
            include : {
                team : true 
            }
        }) ;
        if( !data ) {
            return res.status( 404 ).json({
                "Error Message" : `Project with [ id = ${ id } ] does not exist` 
            }) ; 
        }
        const parsedData = getProjectSchema.parse( data ) ;
        res.status( 200 ).json( parsedData ) ; 
    } catch{
        res.status( 400 ).json( "ERROR" ) ;
    }
}

export const createProject = async ( req : Request , res : Response ) => {
    try{
        const parsedData = createProjectSchema.parse( req.body ) ; 
        const data = await prisma.project.create({
            data : {
                title : parsedData.title , 
                tasks : {
                    connect : parsedData.tasks?.map( id => ( { id } ) ) 
                } ,
                teamId : parsedData.teamId 
            }
        }) ; 
        res.status( 201 ).json( data ) ;
    }catch( err ) {
        res.status( 400 ).json( "ERROR" ) ;
    }
}

export const updateProject = async ( req : Request , res : Response ) => {
    try{    
        const id = parseInt( req.params.id , 10 ) ; 
        const data = await prisma.project.findUnique({
            where : { id }
        }) ; 
        if( !data ) {
                return res.status( 404 ).json({
                    "Error Message" : `Project with [ id = ${ id } ] does not exist`
                }) ; 
        }
        const parsedData = updateProjectSchema.parse( req.body ) ;
        const updatedData = await prisma.project.update({
            where : { id } ,
            data : {
                title : parsedData.title , 
                tasks : {
                    connect : parsedData.tasks?.map( id => ( { id } ))
                },
                teamId : parsedData.teamId 
            }
        }) ; 
        res.status( 201 ).json( updatedData ) ; 
    }catch( err ){
        res.status( 400 ).json( "ERROR" ) ;
    }
}


export const deleteProject = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ; 
        const data = await prisma.project.findUnique({
            where : { id } 
        }) ; 
        if( !data ) {
            return res.status( 404 ).json({
                "Error Message" : `Project with [ id == ${ id } ] does not exist`
            }) ; 
        }
        const deldata = await prisma.project.delete({
            where : { id }
        }) ; 
        res.status( 200 ).json( deldata ) ; 
    }catch( err ) {
        res.status( 400 ).json( "ERROR" ) ;
    }
}