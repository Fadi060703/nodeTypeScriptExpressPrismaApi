import { z } from "zod";
import { AccTypeSchema } from "./accType";

export const baseUserSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  accountType: AccTypeSchema,
});

export const baseTeamSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
});

export const baseProjectSchema = z.object({
  id : z.number().positive() , 
  title : z.string() ,
}) ;

export const baseTaskSchema = z.object({
  id : z.number().positive() , 
  title : z.string().min( 3 ) ,
}) ; 