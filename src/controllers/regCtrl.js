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

exports.ViewCitypage=(req, res) => {
	db.query("select * from citymaster",(err,result)=>
{
	if(err)
	{
		res.render("viewCity.ejs");

	}
	else
	{
		res.render("viewCity.ejs",{Citydata:result});

	}
});
}
 
exports.CityDelete=(req, res) => {
  let city_id = parseInt(req.query.cityid.trim());
  db.query("delete from citymaster where city_id=?", [city_id], (err, result) => {

	if(err)
	{
		console.log(err)
	}
});
  db.query("select * from citymaster", (err, result) => {
    if (err) {
      console.log("Some Problem Occured " + err);
    } else {
      res.render("viewCity.ejs", { Citydata: result });
    }
  });
};


exports.AmenitiesDash=(req,res)=>{

	res.render("amenitiesDashboard.ejs");

};
exports.Amenitiespage=(req,res)=>{

	res.render("amenities.ejs",{msg:""});

};
exports.Saveamenities=(req,res)=>
{
 let {amenity_name}=req.body;


db.query("insert into amenities  values('0',?)", [amenity_name],(err,result)=>
{
	if(err){
		res.render("amenities.ejs",{msg:"Some Problem Occured while Adding course"});
	}else{
		res.render("amenities.ejs",{msg:"Amenities added successfully"});
	}
});

};

exports.ViewAmenitiespage=(req, res) => {
	db.query("select * from amenities",(err,result)=>
{
	if(err)
	{
		res.render("viewAmenities.ejs");

	}
	else
	{
		res.render("viewAmenities.ejs",{Amenitiesdata:result});

	}
});
}
 
exports.AmenitiesDelete=(req, res) => {
  let  amenity_id  = parseInt(req.query.amenityid.trim());
  db.query("delete from amenities where  amenity_id =?", [ amenity_id ], (err, result) => {

	if(err)
	{
		console.log(err)
	}
});
  db.query("select * from amenities", (err, result) => {
    if (err) {
      console.log("Some Problem Occured " + err);
    } else {
      res.render("viewAmenities.ejs", { Amenitiesdata: result });
    }
  });
};


exports.AreaDash=(req,res)=>{


	res.render("areaDashboard.ejs");

};
exports.Areapage=(req,res)=>{

	async function getdata() {

			try
			{
				let r=await model.fecthcity();
				res.render("area.ejs",{Citdata:r,msg:""});
			}
			catch(err)
			{
				res.render("area.ejs",{Citdata:[],msg:""});
			}
	}
	getdata();
	
};
exports.SaveArea=async(req,res)=>
{
 let {area_name,city_id}=req.body;


// db.query("insert into areamaster  values('0',?)", [area_name],(err,result)=>
// {
// 	if(err){
// 		res.render("area.ejs",{msg:"Some Problem Occured while Adding Area"});
// 	}else{
// 		res.render("area.ejs",{msg:"Area added successfully"});
// 	}
// }); 
let r=await model.fecthcity();
try
{
db.query("insert into areamaster  values('0',?)", [area_name],(err,result)=>
 {
		if(err)
		{
			console.log(err);
			res.render("area.ejs",{Citdata:r,msg:""});
		}
		else{
			db.query("select area_id from areamaster where area_name=? order by area_id desc limit 1",[area_name],(err,result1)=>
			{
					if(err)
					{
						console.log(err);
							res.render("area.ejs",{Citdata:r,msg:""});
					}
					else
					{
						db.query("insert into cityareajoin values(?,?)",[city_id,result1[0].area_id],(err,result3)=>{
							if(err)
							{
								console.log(err);
									res.render("area.ejs",{Citdata:r,msg:""});
							}
							else{
									res.render("area.ejs",{Citdata:r,msg:"Area Added Sucesfully"});
							}
						});
					}
			});
		}
 });	
}
catch(err)
{
	res.render("area.ejs",{Citdata:r,msg:""});
}
};
exports.ViewAreapage=(req, res) => {
	db.query("select a.area_name,c.city_name,a.area_id from areamaster a inner join cityareajoin cj on a.area_id=cj.area_id inner join citymaster c on cj.city_id=c.city_id ",(err,result)=>
{
	if(err)
	{
		res.render("viewArea.ejs");

	}
	else
	{
		res.render("viewArea.ejs",{Areadata:result});

	}
});
}


exports.AreaDelete=(req, res) => {
  let  area_id = req.query.areaid;
  console.log(area_id);
  db.query("delete from areamaster where area_id=?", [area_id], (err, result) => {
	if(err)
	{
		console.log(err);
	}
	db.query("select a.area_name,c.city_name,a.area_id from areamaster a inner join cityareajoin cj on a.area_id=cj.area_id inner join citymaster c on cj.city_id=c.city_id", (err, result) => {
    if (err) {
      console.log("Some Problem Occured " + err);
    } else {
      res.render("viewArea.ejs", { Areadata: result });
    }
  });
   });
};

exports.ReviewDash=(req,res)=>{

	res.render("reviewDashboard.ejs");

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
 exports.ViewReviewpage=(req,res)=>{
	db.query("select * from reviewmaster ",(err,result)=>
{
	if(err)
	{
		res.render("viewReview.ejs");

	}
	else
	{
		res.render("viewReview.ejs",{Reviewdata:result});

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
		console.log(err);
		res.render("hotelpic.ejs",{msg:"Some Problem Occured while Adding Pic"});
	}else{
		res.render("hotelpic.ejs",{msg:"Pic added successfully"});
	}
});

};
exports.ViewHotelPicpage=(req, res) => {

	db.query("select * from  hotelpicjoin;",(err,result)=>
{
	if(err)
	{
		res.render("viewHotelpic.ejs");

	}
	else
	{
		res.render("viewHotelpic.ejs",{HotelPicdata:result});

	}
});
}
exports.HotelPicDelete=(req, res) => {
  let  pic_id = parseInt(req.query.picid.trim());
  db.query("delete from hotelpicjoin where pic_id=?", [pic_id], (err, result) => {
});
  db.query("select * from  hotelpicjoin;", (err, result) => {
    if (err) {
      console.log("Some Problem Occured " + err);
    } else {
      res.render("viewHotelpic.ejs", { HotelPicdata: result });
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
console.log(req.body);
console.log(pic_id+ "  pic id is ")
db.query("insert into hotelmaster  values('0',?,?,?,?,?,?,?,?)", [hotel_name,hotel_address,city_id,area_id,hotel_email, hotel_contact,rating,pic_id],(err,result)=>
{
	if(err)
	{
		console.log(err);
	}
	db.query("SELECT * FROM citymaster",(err,citresult)=>{

	db.query("SELECT * FROM areamaster",(err,arearesult)=>{

	db.query("SELECT * FROM hotelpicjoin",(err,picresult)=>{
     res.render("hotel.ejs",{Citdata:citresult,Areadata:arearesult,Picdata:picresult,msg:"Hotel added successfully "});
})
})
})
});

};

exports.ViewHotelAdminpage = (req, res) => {
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
      
      return res.render("viewHotelAdmin.ejs"); 
    } else {
      res.render("viewHotelAdmin.ejs", { HotelAdmindata: result });
    }
  });
};
exports.HotelAdminDelete=(req, res) => {
  let  hotel_id = parseInt(req.query.hoteladminid.trim());
  db.query("delete from hotelmaster where hotel_id=?", [hotel_id], (err, result) => {
});
  db.query("select * from hotelmaster", (err, result) => {
    if (err) {
      console.log("Some Problem Occured " + err);
    } else {
      res.render("viewHotelAdmin.ejs", { HotelAdmindata: result });
    }
  });
};

exports.HotelUpadate = (req, res) => {

let hotelid = parseInt(req.query.hotelid.trim());
console.log(hotelid);
        let temp;

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
    where h.hotel_id=?
  `;

  db.query(query,[hotelid],(err, result) => {
    if (err) {
      console.log("err "+err);
          } else {

		// temp=result;
		 console.log(result);

      db.query("SELECT * FROM citymaster",(err,citresult)=>{

	db.query("SELECT * FROM areamaster",(err,arearesult)=>{

	db.query("SELECT * FROM hotelpicjoin",(err,picresult)=>{
     res.render("updateHotelById.ejs",{erecord: result,Citdata:citresult,Areadata:arearesult,Picdata:picresult});
})
})
})
    }
  });
};

exports.FinlHotelUpadate = (req, res) => {
	let {hotel_id,hotel_name,hotel_address,city_id,area_id,hotel_email, hotel_contact,rating,pic_id}=req.body;

	db.query("update hotelmaster set hotel_name=?,hotel_address=?,city_id=?, area_id=?,hotel_email=?,hotel_contact=?, rating=?,pic_id=? where hotel_id=?",[hotel_name,hotel_address,city_id,area_id,hotel_email, hotel_contact,rating,pic_id,hotel_id],(err,result)=>{});
      res.redirect("/viewhotelAdmin");


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

exports.getareadata=(req,res)=>
{
	let city_id=req.query.city_id;
	console.log(city_id);
	db.query("select a.area_name,a.area_id from citymaster c inner join cityareajoin cj on c.city_id=cj.city_id inner join areamaster a on a.area_id=cj.area_id where cj.city_id=?",[city_id],(err,result)=>
	{
		console.log(result);
		res.json(result);
	});
}

exports.CustomerView=(req, res) => {
	db.query("select * from usermaster where type=?",["user"],(err,result)=>
{
	if(err)
	{
		res.render("viewCustomer.ejs",{Userdata:[]});

	}
	else
	{
		res.render("viewCustomer.ejs",{Userdata:result});

	}
});
}



exports.ViewHotelDash=(req,res)=>{

db.query("SELECT * FROM citymaster",(err,citresult)=>{

	db.query("SELECT * FROM areamaster",(err,arearesult)=>{

	res.render("viewHotelDashboard.ejs",{Citdata:citresult,Areadata:arearesult,filename:"no"});

	});
});
};

exports.SearchHotel = (req, res) => {
  let cityname = req.query.hd.trim();

  let query = `
    SELECT h.*, c.city_name 
    FROM hotelmaster h 
    JOIN citymaster c ON h.city_id = c.city_id 
    WHERE c.city_name LIKE ?
  `;

  db.query(query, [`%${cityname}%`], (err, result) => {
    if (err) {
      console.log("SearchHotel error: ", err);
      
    } else {
      res.json(result);
    }
  });
};

exports.getFilterCity=async(req,res)=>
{
	let id=req.query.id;

	try
	{
	let r=await model.getFilterCity1(id);
	    console.log(r);
		db.query("SELECT * FROM citymaster",(err,citresult)=>{
					console.log(citresult);
					db.query("SELECT * FROM areamaster",(err,arearesult)=>{
							console.log(arearesult);
						res.render("viewHotelDashboard.ejs",{Citdata:citresult,Areadata:arearesult,filename:"viewHotel.ejs",data:r});

			});
		});
	}
	catch(err)
	{
		console.log(err);
		db.query("SELECT * FROM citymaster",(err,citresult)=>{

					db.query("SELECT * FROM areamaster",(err,arearesult)=>{

						res.render("viewHotelDashboard.ejs",{Citdata:citresult,Areadata:arearesult,filename:"viewHotel.ejs",data:r});

			});
		});
	
	}
};



