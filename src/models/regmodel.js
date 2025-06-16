let db=require("../config/db.js");
let bcrypt=require("bcrypt");
exports.saveRegData=(...regData)=>{
return new Promise((resolve,reject)=>{
	
	db.query("insert into usermaster value('0',?,?,?,?,?)",[regData[0],regData[1],regData[2],regData[3],regData[4]],(err,result)=>{
	if(err){
		reject(err);
	}
	else{
		resolve("success");
	}
});

});
}
exports.validate=(username,password,role)=>
{
	return new Promise((resolve,reject)=>
	{
		db.query("select password from usermaster where username=? and type=?",[username,role],(err,result1)=>
		{
			if(err)
			{
				console.log("error");
			}
			else
			{
				if(result1.length==0)
				{
					return resolve("No User Found");
				}
				console.log(result1[0].password);
				let pass=bcrypt.compareSync(password,result1[0].password);
				console.log(pass);
		
			if(pass)
			{
				return resolve("Sucesfull");
			}
			resolve("Invalid Username and Password");
			}
		});
	});
}
exports.fecthcity=()=>
{
		return new Promise((resolve,reject)=>
		{
				db.query("SELECT * FROM citymaster",(err,citresult)=>{
			if(err)
			{
				// res.render("area.ejs",{Citdata:[],msg:""});
				reject(err)
			}
			else
			{
			// res.render("area.ejs",{Citdata:citresult,msg:""});
				resolve(citresult);
			}
	});
		});
}
