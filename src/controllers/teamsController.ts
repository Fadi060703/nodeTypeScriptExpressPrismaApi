import { Request , Response } from "express" ;
import { prisma  } from "../lib/prisma";
import { createTeamSchema, getTeamsSchema } from "../validators/teams";
import { z } from 'zod' ; 
export const getTeams = async ( req : Request , res : Response ) => {
    try{
        const data = await prisma.team.findMany({
            include : {
                users : true , 
                projects : true 
            }
        }) ; 

        const shapedData = data.map( team => ({
            id : team.id , 
            name : team.name , 
            userIds : team.users.map( u => u.id) ,
            projectIds : team.projects.map( p => p.id ) 
        }) ) ;
        const parsedData = z.array( getTeamsSchema ).parse( shapedData ) ;

        res.status( 200 ).json( parsedData ) ; 
    }
    catch( err ) {
        res.status( 400 ).send({ err : "NOT" }) ; 
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