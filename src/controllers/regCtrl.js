let regService=require("../services/regservice.js");
let regmodel=require("../models/regmodel.js");

exports.regCtrl=(req, res) => {
	let {name,email,contact,username,password}=req.body;

	
	let result=regService.acceptRegData(name,email,contact,username,password);
  	res.render("register",{msg:result});
}

exports.homePage=(req,res)=>{
	res.render("homepage.ejs");
}


exports.signUpPage=(req,res)=>{

	res.render("register.ejs",{msg:""});
}

exports.signInPage=(req,res)=>{

	res.render("login.ejs",{msg:""});
}
