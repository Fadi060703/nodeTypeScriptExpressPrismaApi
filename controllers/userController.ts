import express , { Request , response, Response } from "express" ; 
import { prisma } from "../lib/prisma";


export const getUsers = async ( req : Request , res : Response ) => {
    try {
        const usersData = await prisma.user.findMany() ; 
        res.status( 200 ).json( usersData ) ; 
    } catch( error ) {
        res.status( 400 ).json( { error : "Bad Request" } ) ; 
        console.error( error ) ; 
    }
}

export const getUserById = async ( req : Request , res : Response ) => {
    try {
        const id = parseInt( req.params.id , 10 ) ; 
        const userData = await prisma.user.findUniqueOrThrow({
            where : { id } 
        }) ; 
        res.status( 200 ).json( userData ) ; 
    } catch( error ){
        res.status( 400 ).json({ error : error }) ; 
        console.error( error ) ;
    }
}

export const addUser = async ( req : Request , res : Response ) => {
    try{
        const {
            firstName , 
            lastName , 
            age ,
            email , 
            isMarried
        } = req.body ; 
        const user = await prisma.user.create({
            data : { firstName , lastName , age , email , isMarried }
        }) ; 
        res.status( 201 ).json( user ) ;
    } catch( error ) {
        res.status( 400 ).json({ error : error }) ; 
        console.error( error ) ;
    }
}

export const deleteUser = async ( req : Request , res : Response ) => {
    try{
        const id = parseInt( req.params.id , 10 ) ;
        const user = await prisma.user.delete({
            where : { id } 
        }) ;
        res.status( 200 ).json( user ) ; 
    } catch( error ) {
        res.status( 400 ).json( { error : error } ) ; 
        console.error( error ) ;
    }
}