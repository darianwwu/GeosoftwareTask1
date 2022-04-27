"use strict"
/**
* Geosoftware SS2022 Abgabe 1
* @author Darian Weiss
* @version 1.0.0
*/ 
 document.title = "Abgabe 2 Geosoftware Darian Weiß";
 alert(document.title);

var x = document.getElementById("demo");
    
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  //document.getElementById("textfeld").innerHTML = position.coords.latitude +" "+ position.coords.longitude;
  // document.getElementById("textfeld").innerHTML = JSON.stringify({type: "Point", coordinates: [position.coords.longitude, position.coords.latitude]});
  let ausgabe = JSON.stringify({type: "Point", coordinates: [position.coords.longitude, position.coords.latitude]});
  document.getElementById("textfeld").innerHTML = ausgabe;

}

function schreibLocation() {
  document.getElementById("textfeld").innerHTML = JSON.parse(document.getElementById("upload"));
}
/**
 *   Berechnet die Distanz zu den Punkten aus cities.js in Bezug zu dem Punkt aus point.js
 */
function distanceToPoint(punkts){
  var entfernung = new Array(pois.features.length); //Zwischenspeicherungs-Array, das die Entfernungen speichert und später sortiert wird.
  /**
   * Berechnet die Entfernung zweier Punkte anhand ihrer lat/lon Koordinaten
   * Quelle: https://www.movable-type.co.uk/scripts/latlong.html 
   */
    for(var i=0; i < pois.features.length; i++){

      var lon1 = punkts.coordinates[0];  //let lat1 = position.coords.longitude; //Initialisierung des Latitude-Wertes aus point.js zur Verwendung im Distanzberechnungs-Algorithmus.
      var lat1 = punkts.coordinates[1];  // let lon1 = position.coords.latitude; //Initialisierung des Longditude-Wertes aus point.js zur Verwendung im Distanzberechnungs-Algorithmus.
      var lat2 = pois.features[i].geometry.coordinates[1]; // In jeder Iteration wird im Array cities eine Stelle weitergegangen und der Wert in der Variable zwischengespeichert
      var lon2 = pois.features[i].geometry.coordinates[0];// s.o.
        

        const R = 6371e3; // in Meter.
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;
        
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        const d = R * c; // in Meter.
        
      entfernung[i] = d; // Das Array entfernung wird mit dem berechneten Wert aus dieser Iteraion an entsprechender Stelle gefüllt.
    }
    entfernung.sort(function(a, b){
      return a - b
    })
    var ergebnis = ""; //Ergebnis-String, der mit den Entfernungen belegt und im HTML-File ausgegeben wird.
    for(var k=0; k<entfernung.length; k++){

      ergebnis = ergebnis + entfernung[k] + "<br />"; //Der Ergebnis-String wird in jedem Schritt um einen Wert aus dem geordneten Array entfernung und einen Zeilenumbruch ergänzt.
    }
    document.getElementById("ergebnis").innerHTML = ergebnis;
  }

  function calculatePoint(){
    let JSON_input = document.getElementById("textfeld");
    // testing 
    console.log(JSON_input);

    // Here I check, whether the input is viable as a JSON/GeoJSON object
    if(isJsonString(JSON_input.value)){

        // Here I check, whether the GeoJSON is a point, because only than i can calculate properly
        if(JSON.parse(JSON_input.value).type == "Point"){

            point = JSON.parse(document.getElementById("textfeld").value);
            console.log(point)
            distanceToPoint(point);
        }
        else{

            // Error!
            alert("WRONG INPUT! PLEASE TRY AGAIN");

        }      

    }
    else{

        // Error!
        alert("WRONG INPUT! PLEASE TRY AGAIN");

    }
}

function isJsonString(str) {
  try{
  JSON.parse(str);
  } 
  catch (e){
  return false;
  }
  return true;
}