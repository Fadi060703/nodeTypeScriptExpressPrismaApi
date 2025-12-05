 import express from 'express' ; 
import { login, signUp } from '../controllers/authController';
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/usersController';
import { createTeam, deleteTeam, getTeam, getTeams, updateTeam } from '../controllers/teamsController';
import { createProject, getProjectById, getProjects } from '../controllers/projectsController';

const router = express.Router() ;
/* Auth */ 
router.post( '/auth/signup' , signUp ) ; 
router.post( '/auth/login' , login ) ;
/* Auth */

/* User Management */
router.get( '/users' , getUsers ) ;
router.get( '/users/:id' , getUserById ) ;
router.patch( '/users/:id' , updateUser ) ;
router.delete( '/users/:id' , deleteUser ) ;
/* User Management */

/* Teams Management */
router.get( '/teams' , getTeams ) ;
router.get( '/teams/:id' , getTeam ) ;
router.post( '/teams' , createTeam ) ;
router.patch( '/teams/:id' , updateTeam ) ; 
router.delete( '/teams/:id' , deleteTeam ) ; 
/* Teams Management */

router.get( '/projects' , getProjects ) ;
router.post( '/projects' , createProject ) ;
router.get( '/projects/:id' , getProjectById ) ;

export default router ; 