let models=require("../models/regmodel.js");
class RegService{

	acceptRegData(name,email,contact,username,password){
		let index=email.indexOf("@gmail.com");

		if(index!=-1)
		{
			let result=models.saveUser(name,email,contact,username,password);
			return  result?"Registration Success ":"Registration Failed";
		}
		else
		{
			return "You are not gamil user";
		}
	}
}

module.exports=new RegService();