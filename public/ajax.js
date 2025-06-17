
function fetcharea(str) {
  // Create a new XMLHttpRequest object
  let val=document.getElementById("ns").value;
  
  // alert(val);
  var xhr = new XMLHttpRequest();

  // Set up the request
 xhr.open("GET", "/getareadata?city_id="+val, true);
  // Define what happens when response is received
  xhr.onload = function() {
    if (xhr.status == 200) {
    //   document.getElementById("result").innerHTML = xhr.responseText;

      document.getElementById("area").innerHTML="";
         let data = JSON.parse(xhr.responseText);
          console.log(data);

            data.forEach((ele) => {
  let tag = document.createElement("option");
  tag.value = ele.area_id;          // set option value
  tag.innerHTML = ele.area_name;    // set option text
  document.getElementById("area").appendChild(tag);
});



    } else {
    //   document.getElementById("result").innerHTML = "Error: " + xhr.status;
        alert(xhr.status);
    }
  };

  // Send the request // true = asynchronous
  xhr.send();
}