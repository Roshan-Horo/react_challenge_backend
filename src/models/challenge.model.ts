import mongoose from "mongoose"

const challengeSchema = new mongoose.Schema({
   title: {type: String, required: [true, "Enter your Challenge Name"]},
   challenge_categories: {type: String, required: [true, "Enter your Challenge Categories"]},
   description: {type: String, required: [true, "Enter your Challenge description"]},
   files: {type: String, required: [true, "Enter your Challenge files"]}
},{
  timestamps: true
})

const challengeModel = mongoose.model("Challenge", challengeSchema)

export default challengeModel