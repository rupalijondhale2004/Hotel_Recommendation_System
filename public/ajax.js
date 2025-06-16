
function loadData() {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set up the request

  // Define what happens when response is received
  xhr.onload = function() {
    if (xhr.status == 200) {
    //   document.getElementById("result").innerHTML = xhr.responseText;
        alert(xhr.responseText);
    } else {
    //   document.getElementById("result").innerHTML = "Error: " + xhr.status;
        alert(xhr.status);
    }
  };

  // Send the request
  xhr.open("GET", "/getareadata", true); // true = asynchronous
  xhr.send();
}