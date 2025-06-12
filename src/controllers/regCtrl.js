let regService=require("../services/regservice.js");


exports.homePage=(req,res)=>{
	res.render("homepage.ejs");
}

exports.regctrl=(req,res)=>{
	res.render("register.ejs",{msg:""});
};

exports.saveReg=(req,res)=>{
	let {username,useremail,password,contact,type}=req.body;
	let result=regService.regServiceLogic(username,useremail,password,contact,type);
	
	result.then((r)=>{
		res.render("register.ejs",{msg:r});
	});
	 
};

exports.regLogin=(req,res)=>{
	res.render("login.ejs",{msg:""});
};

//rupa