let conn=require("../config/db.js");

exports.saveUser=(...regData)=>{
	conn.query("insert into usermaster values('0',?,?,?,?,?)",[...regData]);
	return true;
}

exports.validateUserFromDB = (...userCred) => {
	let promise=new Promise((resolve,reject)=>{
		
		conn.query("SELECT * FROM usermaster WHERE username = ? AND password = ?",[...userCred], (err, result) => {
 		 if(err)
		 {
			reject(err);
		 }
		 else
		 {
			console.log(result);
			resolve(result);
		 }  
    });

	});
		return promise;
  };


 
exports.getLoginUserProfile = (loginUserId) => {
	let promise=new Promise((resolve,reject)=>{
		
		conn.query("SELECT * FROM usermaster WHERE rid =?",[loginUserId], (err, result) => {
 		 if(err)
		 {
			reject(err);
		 }
		 else
		 {
			console.log(result);
			resolve(result);
		 }  
    });

	});
		return promise;
  };

