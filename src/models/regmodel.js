let conn=require("../config/db.js");

exports.saveUser=(...regData)=>{
	conn.query("insert into nureg values('0',?,?,?,?,?)",[...regData]);
	return true;
}

exports.validateUserFromDB = (...userCred) => {
	let promise=new Promise((resolve,reject)=>{
		
		conn.query("SELECT * FROM nureg WHERE username = ? AND password = ?",[...userCred], (err, result) => {
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
		
		conn.query("SELECT * FROM nureg WHERE rid =?",[loginUserId], (err, result) => {
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

exports.getUpdateUserProfile = (userId, updatedData) => {
  let promise = new Promise((resolve, reject) => {
   
    conn.query("UPDATE nureg SET ? WHERE rid = ?", [updatedData, userId], (err, result) => {
      if (err) 
      {
       		reject(err);
      } 
      else 
       {
        console.log('User profile updated successfully:', result);
        resolve(result);
      }
    });
  });
	return promise;
};

