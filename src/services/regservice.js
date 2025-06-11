
let models=require("../models/regmodel.js");

class RegService{

	acceptRegData(username,useremail,password,contact,type){
		
		let index=useremail.indexOf("@gmail.com");

		if(index!=-1)
		{
			let result=models.saveUser(username,useremail,password,contact,type);
			return  result?"Registration Success ":"Registration Failed";
		}
		else
		{
			return "You are not gamil user";
		}
	}
}

module.exports=new RegService();