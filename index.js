let app=require("./src/app.js");

require('dotenv').config();

app.listen(7777,()=>{
	
	console.log("Server Started...");
});