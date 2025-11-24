import express from 'express' ; 
import { addUser, deleteUser, getUserById, getUsers } from '../controllers/userController' ;

const router = express.Router() ; 

router.get( '/users' , getUsers ) ;
router.get( '/users/:id' , getUserById ) ;
router.post( '/users' , addUser ) ; 
router.delete( '/users' , deleteUser ) ; 

export default router ; 