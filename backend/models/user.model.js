import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			default: "",
		},
		pass: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		profileUrl: {
			type: String,
			default: "",
		},
		avatarUrl: {
			type: String,
			default: "",
		},
		likedProfiles: {
			type: [String],
			default: [],
		},
		// likedBy: [
		// 	{
		// 		username: {
		// 			type: String,
		// 			required: true,
		// 		},
		// 		avatarUrl: {
		// 			type: String,
		// 		},
		// 		likedDate: {
		// 			type: Date,
		// 			default: Date.now,
		// 		},
		// 	},
		// ],
	},
	{ 
		timestamps: true 
	}
);

//Password Hashing
userSchema.pre('save', async function (next){
	if(!this.isModified('password'))
	{
		return next();
	}

	this.pass = this.password;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

//Password Compare
userSchema.methods.matchPassword = async function (enteredPassword){
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
