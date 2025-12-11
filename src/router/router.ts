import express from 'express' ; 
import { login, signUp } from '../controllers/authController';
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/usersController';
import { createTeam, deleteTeam, getTeam, getTeams, updateTeam } from '../controllers/teamsController';
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/projectsController';
import { createTask, getTaskById, getTasks } from '../controllers/tasksController';

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


/* Projects Management */ 
router.get( '/projects' , getProjects ) ;
router.post( '/projects' , createProject ) ;
router.get( '/projects/:id' , getProjectById ) ;
router.patch( '/projects/:id' , updateProject ) ;
router.delete( '/projects/:id' , deleteProject ) ;   
/* Projects Management */ 


/* Tasks Management */ 
router.get( '/tasks' , getTasks ) ; 
router.get( '/tasks/:id' , getTaskById ) ; 
router.post( '/tasks' , createTask ) ;
/* Tasks Management */ 



export default router ;  