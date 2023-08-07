import { Request, Response , NextFunction } from 'express'
import CONSTANTS from '../utils/constants'
import Challenge from '../models/challenge.model'
import { CREATE_CHALLENGE } from '../utils/apiTypeConstants';
import { validateRequest } from '../validators/validate';

export const getAllChallenges = async (req: Request, res: Response, next: NextFunction) => {

  // fetch all challenges from db
  try {
    let challenges = await Challenge.find({});

    if(challenges){
      // send challenge details
      res.status(CONSTANTS.OK).json({
        status: true,
        msg: "successfull",
        data: challenges
      })
    }else{
      // challenge not found
      res.status(CONSTANTS.NOTFOUND).json({ status: false,msg: "Challenges Not Found"})
    }

  } catch (error) {
      res.status(CONSTANTS.SERVERERROR).json({
        status: false,
        msg: "Getting Error while Fetching Challenges.",
        data: error
      })
  }
}

export const createChallenge = async (req: Request, res: Response, next: NextFunction) => {

  // get challenge data
  if(req.user && req.body){
  let userId = req.user.id
  const { title, challenge_categories, description, files } = req.body

  // validate data
  let validationResult = validateRequest({type: CREATE_CHALLENGE, validateData: {title, challenge_categories, description, files}})

  if(validationResult.status === true){

    try {
           // check if challenge already exists
           let isChallengeExist = await Challenge.findOne({title: new RegExp(title, 'i')});

           if(isChallengeExist){
             res.status(CONSTANTS.BADREQUEST).json({
               status: false,
               msg: "Challenge Already Exists with the same title, make another one."
             })
           }else{
     
           // create challenge
           let challenge = await Challenge.create({
            title, challenge_categories, description, files
           })
      
           // send challenge info
           res.status(CONSTANTS.OK).json({
              status: true,
              msg: "Successfully created challenge.",
              data : challenge
           })
           }

    } catch (error) {
        res.status(CONSTANTS.SERVERERROR).json({
          status: false,
          msg: "Getting Error while Fetching Challenge.",
          data: error
        })
    }

  }else{
    res.status(CONSTANTS.BADREQUEST).json({
      status: false,
      msg: "Input data Invalid",
      data: validationResult
    })
  }
  }else{
      // user not found
      res.status(CONSTANTS.BADREQUEST).json({ status: false, msg: "Challenge data Not Found"})
  }

}

export const getChallengeWithId = async (req: Request, res: Response, next: NextFunction) => {

  // get challenge id
  if(req.params){
  const { challengeId } = req.params

  if(!challengeId || challengeId === ""){
     res.status(CONSTANTS.BADREQUEST).json({
      status: false,
      msg: "Challenge Id Not Found"
     })
  }else{
      // fetch data from db
      try {
        let challenge = await Challenge.findById(challengeId);

        if(challenge){
          // send challenge details
          res.status(CONSTANTS.OK).json({
            status: true,
            msg: "successfull",
            data: challenge
          })
        }else{
          // challenge not found
          res.status(CONSTANTS.NOTFOUND).json({ status: false,msg: "Challenge Not Found"})
        }

      } catch (error) {
          res.status(CONSTANTS.SERVERERROR).json({
            status: false,
            msg: "Getting Error while Fetching Challenge.",
            data: error
          })
      }
  }

  }else{
      // user not found
      res.status(CONSTANTS.BADREQUEST).json({ status: false, msg: "Challenge Id Not Found"})
  }

}

export const getChallengeWithName = async (req: Request, res: Response, next: NextFunction) => {

  // get challenge name
  if(req.params){
  const { challengeName } = req.params

  if(!challengeName || challengeName === ""){
     res.status(CONSTANTS.BADREQUEST).json({
      status: false,
      msg: "Challenge Name Not Found"
     })
  }else{
      // fetch data from db
      try {
        //let challenge = await Challenge.findOne({title: {$regex : /${challengeName}/i}});

        let challenge = await Challenge.findOne({title: new RegExp(challengeName, 'i')});
        if(challenge){
          // send challenge details
          res.status(CONSTANTS.OK).json({
            status: true,
            msg: "successfull",
            data: challenge
          })
        }else{
          // challenge not found
          res.status(CONSTANTS.NOTFOUND).json({ status: false,msg: "Challenge Not Found"})
        }

      } catch (error) {
          res.status(CONSTANTS.SERVERERROR).json({
            status: false,
            msg: "Getting Error while Fetching Challenge.",
            data: error
          })
      }
  }

  }else{
      // user not found
      res.status(CONSTANTS.BADREQUEST).json({ status: false, msg: "Challenge Name Not Found"})
  }

}

