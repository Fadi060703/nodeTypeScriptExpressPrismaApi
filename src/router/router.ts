 import express from 'express' ; 
import { createProject, getProjectById, getProjects } from '../controllers/projectsController';
import { createTask, getTaskById, getTasks } from '../controllers/tasksController';
import { login, signUp } from '../controllers/authController';
import { authMiddleware } from '../middlewares/auth';
import { createTeam, getTeamById, getTeams } from '../controllers/teamsController';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userControllers';

const router = express.Router() ;
/* Auth */ 
router.post( '/auth/signup' , signUp ) ; 
router.post( '/auth/login' , login ) ;
/* Auth */


router.get( '/users' , getUsers ) ;
router.get( '/users/:id' , getUserById ) ;
router.patch( '/users/:id' , updateUser ) ;  
router.delete( '/users/:id' , deleteUser ) ;


router.get( '/teams' , getTeams ) ; 
router.get( '/teams/:id' , getTeamById ) ;
router.post( '/teams' , createTeam ) ;


router.get( '/projects' , getProjects ) ;
router.get( '/projects/:id' , getProjectById ) ;
router.post( '/projects' , createProject ) ;


router.get( '/tasks' , getTasks ) ; 
router.get( '/tasks/:id' , getTaskById ) ; 
router.post( '/tasks' , createTask ) ; 

export default router ; 