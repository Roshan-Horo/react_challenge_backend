import express from 'express'
import { createUser, authUser, createUserForFirebase, generateTokenForFirebase,getAllChallengesForUser,  getUser, checkEmailAlreadyExists} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware'

const router = express.Router();

/**
 * METHOD - POST
 * PATH - /user
 * ACCESS - public
 * desc - create user with name, email, phone
 */
router.post('/', createUser);

/**
 * METHOD - POST
 * PATH - /user/login
 * ACCESS - public
 * desc - login with email and passcode
 */
router.post('/login', authUser)

/**
 * METHOD - GET
 * PATH - /user
 * ACCESS - protected
 * desc - get register user using id
 */
router.get('/', protect,  getUser);

/**
 * METHOD - GET
 * PATH - /user/challenges
 * ACCESS - protected
 * desc - get all challenges completed by user
 */
router.get('/challenges', protect,  getAllChallengesForUser);

/**
 * METHOD - POST
 * PATH - /user/check_email
 * ACCESS - public
 * desc - check email is already exists
 */
router.post('/check_email', checkEmailAlreadyExists);


export default router