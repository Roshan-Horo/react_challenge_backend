import mongoose from "mongoose"

const userChallengeSchema = new mongoose.Schema({
  userId : {type: mongoose.Schema.Types.ObjectId, required: [true, "Enter your user Id"], ref: 'User'},
  challengeId : {type: mongoose.Schema.Types.ObjectId, required: [true, "Enter your challenge Id"], ref: 'Challenge'},
  files: {type: String, required: [true, "must have challenge files"]}
},{
  timestamps: true
})

const userChallengeModel = mongoose.model("UserChallenge", userChallengeSchema)

export default userChallengeModel