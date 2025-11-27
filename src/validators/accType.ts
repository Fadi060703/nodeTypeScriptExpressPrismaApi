import { z } from 'zod' ; 

export const AccTypeSchema = z.enum( [ "SUPERUSER" , "DEFAULT" ] ) ;

export type AccTypeDTO = z.infer< typeof AccTypeSchema > ; 