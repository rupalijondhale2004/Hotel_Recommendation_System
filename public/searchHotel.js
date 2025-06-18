  let searchHotel=(str)=>
    {	
    	let xhttp=new XMLHttpRequest();

    xhttp.onreadystatechange=function()
   {
        if(this.readyState ==4 && this.status==200)
	{
            let tableBody=document.getElementById("tblBody");
            tableBody.innerHTML="";
	    
            let responseData=this.responseText;
            let jsonObj=JSON.parse(responseData);

            jsonObj.forEach((item,index)=> {
                let row=document.createElement("tr");
                let clm=document.createElement("td");
                clm.innerHTML=""+(index+1);
                row.appendChild(clm);

                clm=document.createElement("td");
                clm.innerHTML=""+item.hotel_name;
                row.appendChild(clm);

                clm=document.createElement("td");
                clm.innerHTML=""+item.hotel_address;
                row.appendChild(clm);

                clm=document.createElement("td");
                clm.innerHTML=""+item.city_name;
                row.appendChild(clm);
            
		clm=document.createElement("td");
                clm.innerHTML=""+item.area_name;
                row.appendChild(clm);
		
		clm=document.createElement("td");
                clm.innerHTML=""+item.hotel_email;
                row.appendChild(clm);

                clm=document.createElement("td");
                clm.innerHTML=""+item.hotel_address;
                row.appendChild(clm);

                clm=document.createElement("td");
                clm.innerHTML=""+item.hotel_contact;
                row.appendChild(clm);
            
		clm=document.createElement("td");
                clm.innerHTML=""+item.rating;
                row.appendChild(clm);

                clm=document.createElement("td");
                clm.innerHTML=""+item.filename;
                row.appendChild(clm);


		clm=document.createElement("td");
		
   clm.innerHTML="<a href=''>DELETE</a>";
		 row.appendChild(clm);

		clm=document.createElement("td");
		
   clm.innerHTML="<a href=''>UPDATE</a>";
		 row.appendChild(clm);
		
		tableBody.appendChild(row);
            });

        }
    };

xhttp.open("GET","/searchHotel?hd="+str,true);
xhttp.send();

}
