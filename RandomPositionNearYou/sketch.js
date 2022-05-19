let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

const cRad = 15;

var clat = 0;
var clng = 0;

var rlat = 0;
var rlng = 0;

var generated = false;

// Lets change the map tiles to something with more contrast
const options = {
  lat: clat,
  lng: clng,
  zoom: 4,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

function setup(){
  canvas = createCanvas(displayWidth, displayHeight - 175);
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);

  getLocation();

  let button = createButton("Generate");
  button.mousePressed(randomPos);

}

function draw() {
  drawCPos();
  if (generated)
  {
    drawRPos();
  }
}

function drawCPos() {

  getLocation();

  clear();

  const pos = myMap.latLngToPixel(clat, clng);

  var d = Math.sqrt(Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2));

  if (d < cRad){
    fill(255);
    var x = document.getElementById("coords");
    text(("Current position:\n" + x.innerHTML).replace("<br>", "\n"), pos.x + 20, pos.y);
  	fill(0);
  }else{
  	fill(0,0,255);
  }

  console.log(d);

  stroke(100);

  ellipse(pos.x, pos.y, cRad, cRad);
}

function drawRPos() {

  getLocation();

  const pos = myMap.latLngToPixel(rlat, rlng);

  var d = Math.sqrt(Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2));

  if (d < cRad){
    fill(255);
    var x = document.getElementById("coords");
    text("Random position:\nLatitude: " + rlat + "\nLongitude: " + rlng, pos.x + 20, pos.y);
  	fill(0);
  }else{
  	fill(255,255,0);
  }

  console.log(d);

  stroke(100);

  ellipse(pos.x, pos.y, cRad, cRad);
}

function randomPos() {
  let r1 = Math.random() * 0.2 - 0.1;
  let r2 = Math.random() * 0.2 - 0.1;
  rlat = clat + r1;
  rlng = clng + r2;
  generated = true;
}

// geo data

function getLocation() {
  var x = document.getElementById("coords");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var x = document.getElementById("coords");
  clat = position.coords.latitude;
  clng = position.coords.longitude;
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
  var x = document.getElementById("coords");
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}