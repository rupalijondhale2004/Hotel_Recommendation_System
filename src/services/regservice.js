
let bcrypt=require("bcryptjs");
let regModel=require("../models/regmodel.js");
exports.regServiceLogic=(...regdata)=>{	 
	let hashedPassword=bcrypt.hashSync(regdata[2],8);

	let result=regModel.saveRegData(regdata[0],regdata[1],hashedPassword,regdata[3],regdata[4])
	return result;
}