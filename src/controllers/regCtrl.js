let regService=require("../services/regservice.js");
let model=require("../models/regmodel.js");
let db=require("../config/db.js");

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
				res.render("userDashboard.ejs");
			}
		}
		else
		{
			res.render("login.ejs",{msg:r});
		}
	});
};

exports.CityDash=(req,res)=>{

	res.render("cityDashboard.ejs");

};
exports.Citypage=(req,res)=>{

	res.render("city.ejs",{msg:""});

};



 
exports.SaveCity=(req,res)=>
{
 let {city_name,pincode}=req.body;


db.query("insert into citymaster  values('0',?,?)", [city_name,pincode],(err,result)=>
{
	if(err){
		res.render("city.ejs",{msg:"Some Problem Occured while Adding course"});
	}else{
		res.render("city.ejs",{msg:"city added successfully"});
	}
});

};
exports.AreaDash=(req,res)=>{

	res.render("areaDashboard.ejs");

};
exports.Areapage=(req,res)=>{
	res.render("area.ejs",{msg:""});
};
exports.SaveArea=(req,res)=>
{
 let {area_name}=req.body;


db.query("insert into areamaster  values('0',?)", [area_name],(err,result)=>
{
	if(err){
		res.render("area.ejs",{msg:"Some Problem Occured while Adding Area"});
	}else{
		res.render("area.ejs",{msg:"Area added successfully"});
	}
});

};
exports.Reviewpage=(req,res)=>{
	res.render("review.ejs",{msg:""});
};
exports.SaveReview=(req,res)=>
{
 let {rev_text,rating,rev_date}=req.body;


db.query("insert into reviewmaster  values('0',?,?,?)", [rev_text,rating,rev_date],(err,result)=>
{
	if(err){
		res.render("review.ejs",{msg:"Some Problem Occured while Adding Review"});
	}else{
		res.render("review.ejs",{msg:"Review added successfully"});
	}
});

};
exports.HotelPicDash=(req,res)=>{

	res.render("hotelPicDashboard.ejs");

};
exports.Picpage=(req,res)=>{
	res.render("hotelpic.ejs",{msg:""});
};
exports.SavePic=(req,res)=>
{
 let {filename}=req.body;


db.query("insert into hotelpicjoin  values('0',?)", [filename],(err,result)=>
{
	if(err){
		res.render("hotelpic.ejs",{msg:"Some Problem Occured while Adding Pic"});
	}else{
		res.render("hotelpic.ejs",{msg:"Pic added successfully"});
	}
});

};
exports.HotelDash=(req,res)=>{

	res.render("hotelDashboard.ejs");

};
exports.Hotelpage=(req,res)=>{
	db.query("SELECT * FROM citymaster",(err,citresult)=>{
	
	db.query("SELECT * FROM areamaster",(err,arearesult)=>{

	db.query("SELECT * FROM hotelpicjoin",(err,picresult)=>{
     res.render("hotel.ejs",{Citdata:citresult,Areadata:arearesult,Picdata:picresult,msg:" "});
})
})
})
}

exports.SaveHotel=(req,res)=>
{
 let {hotel_name,hotel_address,city_id,area_id,hotel_email, hotel_contact,rating,pic_id}=req.body;

console.log(pic_id+ "  pic id is ")
db.query("insert into hotelmaster  values('0',?,?,?,?,?,?,?,?)", [hotel_name,hotel_address,city_id,area_id,hotel_email, hotel_contact,rating,pic_id],(err,result)=>
{
	db.query("SELECT * FROM citymaster",(err,citresult)=>{

	db.query("SELECT * FROM areamaster",(err,arearesult)=>{

	db.query("SELECT * FROM hotelpicjoin",(err,picresult)=>{
     res.render("hotel.ejs",{Citdata:citresult,Areadata:arearesult,Picdata:picresult,msg:"Hotel added successfully "});
})
})
})
});

};



exports.HotelView = (req, res) => {
  const query = `
    SELECT 
      h.hotel_id,
      p.filename,
      h.hotel_name,
      h.hotel_address,
      c.city_name,
      a.area_name,
      h.hotel_email,
      h.hotel_contact,
      h.rating
    FROM 
      hotelmaster h
    LEFT JOIN 
      hotelpicjoin p ON h.pic_id = p.pic_id
    JOIN 
      citymaster c ON h.city_id = c.city_id
    JOIN 
      areamaster a ON h.area_id = a.area_id
  `;

  db.query(query, (err, result) => {
    if (err) {
      
      return res.render("viewHotel.ejs"); 
    } else {
      res.render("viewHotel.ejs", { data: result });
    }
  });
};

