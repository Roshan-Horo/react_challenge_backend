import express from 'express'
import { createChallenge, getAllChallenges, getChallengeWithId, getChallengeWithName} from '../controllers/challengeController';
import { protect } from '../middlewares/authMiddleware'

const router = express.Router();

/**
 * METHOD - GET
 * PATH - /challenges
 * ACCESS - public
 * desc - get all challenges
 */
router.get('/', getAllChallenges);

/**
 * METHOD - POST
 * PATH - /challenges
 * ACCESS - protected
 * desc - create challenge
 */
router.post('/', protect, createChallenge);

/**
 * METHOD - GET
 * PATH - /challenges/<challengeId>
 * ACCESS - public
 * desc - get challenge with challenge Id
 */
router.get('/challengeId/:challengeId', getChallengeWithId)

/**
 * METHOD - GET
 * PATH - /challenges/challengeName/<challenge_title>
 * ACCESS - public
 * desc - get challenge with challenge name
 */
router.get('/challengeName/:challengeName', getChallengeWithName);


export default router