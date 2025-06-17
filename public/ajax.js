function fetcharea(str) {
  let val = document.getElementById("ns").value;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getareadata?city_id=" + val, true);

  xhr.onload = function() {
    if (xhr.status == 200) {
      let areaSelect = document.getElementById("area");
      areaSelect.innerHTML = '<option selected disabled>Select Area</option>';  // Reset + default

      let data = JSON.parse(xhr.responseText);
      console.log(data);

      data.forEach((ele) => {
        let tag = document.createElement("option");
        tag.value = ele.area_id;
        tag.innerHTML = ele.area_name;
        areaSelect.appendChild(tag);
      });
    } else {
      alert("Error loading areas: " + xhr.status);
    }
  };

  xhr.send();
}document.getElementById("area").innerHTML = '<option value="" disabled selected>Select Area</option>';
data.forEach((ele) => {
  let tag = document.createElement("option");
  tag.value = ele.area_id;
  tag.innerHTML = ele.area_name;
  document.getElementById("area").appendChild(tag);
});