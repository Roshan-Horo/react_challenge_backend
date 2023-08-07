import { Request, Response , NextFunction } from 'express'
import CONSTANTS from '../utils/constants'
import UserChallenge from '../models/userChallenge.model'
import User from '../models/user.model'

export const getAllChallengesForUser = async (req: Request, res: Response, next: NextFunction) => {

  // get challenge using userid
  if(req.user){
  let userId = req.user.id

  if(!userId || userId === ""){
     res.status(CONSTANTS.BADREQUEST).json({
      status: false,
      msg: "User Id Not Found"
     })
  }else{
      // fetch data from db
      try {
        let challenge = await UserChallenge.find({ userId });

      //   let challenges = await User.aggregate().lookup({
      //     from: 'user_challenge',
      //     localField: '_id', foreignField: 'userId',
      //     as: 'all_challenges'
      // })

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