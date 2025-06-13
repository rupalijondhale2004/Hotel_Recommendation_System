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
				res.render("adminDashboard.ejs");
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
exports.Citypage=(req,res)=>{
	res.render("city.ejs",{msg:""});
};

exports.SaveCity=(req,res)=>
{
 let {city_name,pincode}=req.body;
if (!city_name || city_name.trim() === "") {
    res.render("city.ejs", { msg: "City should not be null" });
  }else{

db.query("insert into citymaster  values('0',?,?)", [city_name,pincode],(err,result)=>
{
	if(err){
		res.render("city.ejs",{msg:"Some Problem Occured while Adding course"});
	}else{
		res.render("city.ejs",{msg:"city added successfully"});
	}
});
}
 
};