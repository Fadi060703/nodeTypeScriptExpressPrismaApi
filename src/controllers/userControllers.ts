import { Request , Response } from "express" ; 
import { prisma } from "../lib/prisma" ;
import { z } from 'zod' ; 
import { userGetByIdSchema, userGetSchema, userUpdateSchema } from "../validators/user";

export const getUsers = async ( req : Request , res : Response ) => {
    try {
        const users = await prisma.user.findMany() ; 
        const parsedData = z.array( userGetSchema ).parse( users ) ;
        res.status( 200 ).json( parsedData ) ;
    }catch( err ) {
        res.status( 400 ).json( "ERROR" ) ;
    }
}

export const getUserById = async ( req : Request , res : Response ) => {
    try {
        const id = parseInt( req.params.id , 10 ) ;
        const user = await prisma.user.findUnique({
            where : { id } , 
            include : {
                team : true 
            }
        }) ; 
        const parsedData = userGetByIdSchema.parse( user ) ; 
        res.status( 200 ).json( parsedData ) ;
    } catch( err ) {
        res.status( 400 ).json( "ERROR" ) ;
    }
}

export const updateUser = async ( req : Request , res : Response ) => {
    try{
        const data = userUpdateSchema.parse( req.body ) ;
        const id = parseInt( req.params.id , 10 ) ; 
        const user = await prisma.user.update({
            where : { id } , 
            data : { 
                email : data.email , 
                password : data.password , 
                accountType : data.accountType ,
                team : {
                    connect : data.connectTeamIds?.map( ( tid ) => ({ id : tid })), 
                    disconnect : data.disconnectTeamIds?.map( ( tid ) => ( { id : tid } )) , 
                    set : data.setTeamIds?.map( ( tid ) => ( { id : tid } )) 
                }
            }
        }) ; 
        res.status( 201 ).json( user ) ;  
    }catch( err ){
        res.status( 400 ).json( "ERROR" ) ;
    }
} 


export const deleteUser = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ; 
        const user = await prisma.user.delete({
            where : { id } 
        }) ; 
        res.status( 200 ).json( user ) ;
    } catch( err ){
        res.status( 400 ).json( "ERROR" ) ;
    } 
}