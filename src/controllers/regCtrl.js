let regService=require("../services/regservice.js");
let regmodel=require("../models/regmodel.js");

exports.regCtrl=(req, res) => {
	let {username,useremail,password,contact,type}=req.body;

	
	let result=regService.acceptRegData(username,useremail,password,contact,type);
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

exports.validateUser=(req,res)=>{
	let{username,password}=req.body;
	let result=regmodel.validateUserFromDB(username,password);
	result.then((r)=>{
		if(r.length>0)
		{
			req.session.uid=r[0].rid;
			console.log("Login user id:"+r[0].rid);
			//res.render("dashboard.ejs");
		}
		else
		{
			res.render("login.ejs",{msg:"Invalid UserName and Password"});

		}
	}).catch((err)=>{
		//res.render("error.ejs");
	});
}

exports.viewProfile=(req,res)=>{
	let loginUserId=req.session.uid;
	let promobj=regmodel.getLoginUserProfile(loginUserId);
	promobj.then((profile)=>{

		res.render("viewprofile.ejs",{lud:profile[0]});

	}).catch((err)=>{
		console.log(err);
		//res.render("error.ejs");
	})	
	 
};
