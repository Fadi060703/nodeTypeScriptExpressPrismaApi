import { Request, Response } from "express";
import { createTaskSchema, getTaskSchema, getTasksSchema } from "../validators/tasks";
import { prisma } from "../lib/prisma";
import { z } from 'zod';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const data = await prisma.task.findMany();
        if (data.length === 0) {
            return res.status(404).json({
                "Error Message": "No Tasks Found"
            });
        }
        const parsedData = z.array(getTasksSchema).parse(data);
        res.status(200).json(parsedData);
    } catch (err) {
        res.status(400).json("ERROR");
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const data = await prisma.task.findUnique({
            where: { id } ,
            include : {
                project : {
                    include : {
                        team : true 
                    }
                }
            }
        });
        if (!data) {
            return res.status(404).json({
                "Error Message": `Task with [ id == ${id} ] does not exist`
            });
        }
        const parsedData = getTaskSchema.parse( data ) ;
        res.status( 200 ).json( parsedData ) ; 
    }
    catch (err) {
        res.status(400).json("ERROR");
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const parsedData = createTaskSchema.parse(req.body);
        const data = await prisma.task.create({
            data: {
                title: parsedData.title,
                description: parsedData.description,
                projectId: parsedData.projectId
            }
        });
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json("ERROR");
    }
}