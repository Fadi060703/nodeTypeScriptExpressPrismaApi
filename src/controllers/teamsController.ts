import { Request , Response } from "express" ;
import { prisma  } from "../lib/prisma";
import { createTeamSchema, getTeamSchema, getTeamsSchema } from "../validators/teams";
import { z } from 'zod' ; 
export const getTeams = async ( req : Request , res : Response ) => {
    try{
        const data = await prisma.team.findMany({
        }) ; 
        const parsedData = z.array( getTeamSchema ).parse( data ) ; 

        res.status( 200 ).json( parsedData ) ; 
    }
    catch( err ) {
        res.status( 400 ).send({ err : "NOT" }) ; 
    }
}

export const getTeamById = async ( req : Request , res : Response ) => {
    try {
        const id = parseInt( req.params.id , 10 ) ;
        const team = await prisma.team.findUnique({
            where : { id } ,
            include : {
                users : true ,
                projects : true 
            }
        }) ;
        const parsed = getTeamsSchema.parse( team ) ;
        res.status( 200 ).json( parsed ) ; 
    } catch( err ) {
        res.status( 400 ).json( "Error" ) ;
    }
}

export const createTeam = async ( req : Request , res : Response ) => {
    try{
        const parsedData = createTeamSchema.parse( req.body ) ; 
        const team = await prisma.team.create({
            data : { 
                name : parsedData.name ,
                users : {
                    connect : parsedData.userIds?.map( id => ( { id } ) ) 
                } , 
                projects : {
                    connect : parsedData.projectIds?.map( id => ( { id } ) ) 
                }
            }
        }) ; 
        res.status( 201 ).json( team ) ;
    }catch( err ) {
        res.json( 400 ) ;
    }
}