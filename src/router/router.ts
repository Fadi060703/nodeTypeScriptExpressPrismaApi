 import express from 'express' ; 
import { createProject, getProjectById, getProjects } from '../controllers/projectsController';
import { createTask, getTaskById, getTasks } from '../controllers/tasksController';
import { login, signUp } from '../controllers/authController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router() ;

router.post( '/auth/signup' , signUp ) ; 
router.post( '/auth/login' , login ) ;
router.get( '/projects' , authMiddleware , getProjects ) ;
router.get( '/projects/:id' , getProjectById ) ;
router.post( '/projects' , createProject ) ;  
router.get( '/tasks' , getTasks ) ; 
router.get( '/tasks/:id' , getTaskById ) ; 
router.post( '/tasks' , createTask ) ; 

export default router ; 