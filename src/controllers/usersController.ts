import { Request , Response } from 'express' ;
import { prisma } from '../lib/prisma';
import { z } from 'zod' ; 
import { getUserSchema, getUsersSchema, updateUserSchema } from '../validators/users';
import { parse } from 'path';

export const getUsers = async ( req : Request , res : Response ) => {
    try{
        const data = await prisma.user.findMany() ; 
        const parsedData = z.array( getUsersSchema ).parse( data ) ; 
        return res.status( 200 ).json( parsedData ) ;  
    }
    catch( err ) {
        return res.status( 400 ).json( "ERROR" ) ;
    } 
}
export const getUserById = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ; 
        const data = await prisma.user.findUnique({
            where : { id } ,
            include : {
                team : true 
            }
        })
        if( !data ) { 
            return res.status( 404 ).json({ "Error Message" : `User With [ id = ${ id } ] does not exist` }) ;
        }
        const parsedData = getUserSchema.parse( data ) ; 
        return res.status( 200 ).json( parsedData ) ;  
    }
    catch( err ) {
        return res.status( 400 ).json( "ERROR" ) ;
    } 
}


export const updateUser = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ;
        const user = await prisma.user.findUnique({
            where : { id } 
        }) ; 
        if( !user ) { 
            return res.status( 404 ).json({
                "Error Message" : `User with [ id = ${ id } ] does not exist` 
            }) ;
        }
        const parsedData = updateUserSchema.parse( req.body ) ;
        const data = await prisma.user.update({
            where : { id } , 
            data : {
                email : parsedData.email , 
                accountType : parsedData.accountType , 
                team : {
                    connect : parsedData.addTeams?.map( id => ( { id } ) ) ,
                    disconnect : parsedData.remTeams?.map( id => ( { id } ) ) ,
                    set : parsedData.chgTeams?.map( id => ( { id } ) ) , 
                }
            }
        }) ;
        res.status( 201 ).json( data ) ;
    }catch( err ) {
        res.status( 400 ).json( "ERROR" ) ;
    }
}


export const deleteUser = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ; 
        const user = await prisma.user.findUnique({
            where : { id } 
        }) ; 
        if( !user ) { 
            return res.status( 404 ).json({
                "Error Message" : `User with [ id = ${ id } ] does not exist` 
            }) ;
        }
        const data = await prisma.user.delete({
            where : { id } 
        }) ; 
        res.status( 200 ).json( data ) ; 
    } catch( err ){
        res.status( 400 ).json( "ERROR" ) ;
    }
}