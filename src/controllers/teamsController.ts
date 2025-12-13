import { Request , Response } from "express";
import { prisma } from "../lib/prisma";
import { z } from 'zod' ; 
import { createTeamSchema, getTeamSchema, getTeamsSchema, updateTeamSchema } from "../validators/teams";


export const getTeams = async ( req : Request , res : Response ) => {
    try{
        const data = await prisma.team.findMany() ; 
        if( !data ) {
            return res.status( 404 ).json({
                "Error Message" : "No teams found" 
            }) ;
        }
        const parsedData = z.array( getTeamsSchema ).parse( data ) ; 
        res.status( 200 ).json( parsedData ) ;
    } catch( err ) {
        res.status( 400 ).json( "ERROR" ) ; 
    }
}

export const getTeam = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ; 
        const team = await prisma.team.findUnique({
            where : { id } ,
            include : {
                users : true 
            }
        }) ;
        if( !team ) {
            return res.status( 404 ).json({
                "Error Message" : `Team with [ id = ${ id } ] does not exist`
            }) ; 
        }
        const parsedData = getTeamSchema.parse( team ) ; 
        res.status( 200 ).json( parsedData ) ;
    }catch( err ){
        res.status( 400 ).json( "ERROR" ) ;
    }
}


export const createTeam = async ( req : Request , res : Response ) => {
    try{
        const parsedData = createTeamSchema.parse( req.body ) ; 
        const data = await prisma.team.create({
            data : {
                name : parsedData.name ,
                users : {
                    connect : parsedData.users?.map( id => ({ id }) ) 
                }
            },
        }) ; 
        res.status( 201 ).json( data ) ;
    }catch( err ){
        res.status( 400 ).json( "ERROR" ) ;
    }
}

export const updateTeam = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ; 
        const team = await prisma.team.findUnique({
            where : { id } 
        }) ; 
        if( !team ) {
            return res.status( 404 ).json({
                "Error Message" : `Team with [ id = ${ id } ] does not exist` 
            }) ; 
        }
        const parsedData = updateTeamSchema.parse( req.body ) ; 
        const data = await prisma.team.update({
            where : { id } , 
            data : {
                name : parsedData.name ,
                users : {
                    connect : parsedData.addUsers?.map( id => ({ id }) ), 
                    disconnect : parsedData.remUsers?.map( id => ({ id }) ), 
                    set : parsedData.setUsers?.map( id => ({ id }) ) 
                }
            }
        }) ; 
        res.status( 201 ).json( data ) ;
    }
    catch( err ){
        res.status( 400 ).json( "ERROR" ) ;
    }
}

export const deleteTeam = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ; 
        const team = await prisma.team.findUnique({
            where : { id }
        }) ; 
        if( !team ) {
            return res.status( 404 ).json({
                "Error Message" : `Team with [ id = ${ id } ] does not exist` 
            }) ; 
        }
        const data = await prisma.team.delete({
            where : { id } 
        }) ; 
        res.status( 200 ).json( data ) ; 
    }
    catch( err ){
        res.status( 400 ).json( {"ERROR" : err} ) ;
    }
}