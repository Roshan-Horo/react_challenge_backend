import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
   name: {type: String, required: [true, "Enter your name"]},
   email: {type: String, unique: true, required: [true, "Enter your Email"]},
   passcode: {type: String, unique: true, required: [true, "Enter your passcode"]},
   isAdmin: {type: Boolean, default: false},
   challenges: [{
    challengeId: {type: mongoose.Schema.Types.ObjectId, required: [true, "Enter your Challenge Id"], ref: 'Challenge'},
    title: {type: String, required: [true, "Enter your Challenge Name"]},
    challenge_categories: {type: String, required: [true, "Enter your Challenge Categories"]},
    description: {type: String, required: [true, "Enter your Challenge description"]},
    files: {type: String, required: [true, "Enter your Challenge files"]}
   }],
},{
  timestamps: true
})

userSchema.methods.matchPasscode = async function (enteredPasscode: string) {
    return await bcrypt.compare(enteredPasscode, this.passcode)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('passcode')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.passcode = await bcrypt.hash(this.passcode, salt)
})

const userModel = mongoose.model("User", userSchema)

export default userModel