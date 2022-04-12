"use strict"
/**
* Geosoftware SS2022 Abgabe 1
* @author Darian Weiss
* @version 1.0.0
*/
var ergebnis = ""; //Ergebnis-String, der mit den Entfernungen belegt und im HTML-File ausgegeben wird.
var entfernung = new Array(cities.length); //Zwischenspeicherungs-Array, das die Entfernungen speichert und später sortiert wird.

/**
 *   Berechnet die Distanz zu den Punkten aus cities.js in Bezug zu dem Punkt aus point.js
 */
function distanceToPoint(){

  let lat1 = point[1]; //Initialisierung des Latitude-Wertes aus point.js zur Verwendung im Distanzberechnungs-Algorithmus.
  let lon1 = point[0]; //Initialisierung des Longditude-Wertes aus point.js zur Verwendung im Distanzberechnungs-Algorithmus.

  /**
   * Berechnet die Entfernung zweier Punkte anhand ihrer lat/lon Koordinaten
   * Quelle: https://www.movable-type.co.uk/scripts/latlong.html 
   */
    for(var i=0; i < cities.length; i++){

        var lat2 = cities[i][1]; // In jeder Iteration wird im Array cities eine Stelle weitergegangen und der Wert in der Variable zwischengespeichert
        var lon2 = cities[i][0]; // s.o.

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
    /**
     *  Einfache Sortierfunktion für Arrays, sortiert das Array entfernung in aufsteigender Reihenfolge.
     *  Quelle: W3S Schools https://www.w3schools.com/js/js_array_sort.asp
     */
    entfernung.sort(function(a, b){return a - b});

    for(var k=0; k<entfernung.length; k++){

      ergebnis = ergebnis + entfernung[k] + "<br />"; //Der Ergebnis-String wird in jedem Schritt um einen Wert aus dem geordneten Array entfernung und einen Zeilenumbruch ergänzt.
    }
  }
distanceToPoint(); //Die obenstehende Methode wird ausgeführt.