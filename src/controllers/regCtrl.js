let regService=require("../services/regservice.js");
let model=require("../models/regmodel.js");

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
		// res.render("register.ejs",{msg:r});
		res.redirect("/login");
	});
	 
};

exports.regLogin=(req,res)=>{
	res.render("login.ejs",{msg:""});
};
exports.validate=(req,res)=>
{
	let{username,password,role}=req.body;

	//role page render admin admin dash user 

	let result=model.validate(username,password,role);
	result.then((r)=>
	{
		if(r==="Sucesfull")
		{
			if(role==="Admin")
			{
				res.send("admin dashborad");
			}
			else
			{
				res.send("user dashboard");
			}
		}
		else
		{
			res.render("login.ejs",{msg:r});
		}
	});
};
//rupa