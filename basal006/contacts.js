
var pause;
function showSlide(){
  var pic = document.getElementById("display4");
  var i = 0;
  var imageList = [  "QXDDJGh.jpg","sun.png","IMG_5117.PNG"]

  function showNewPic() {
      if (i >= imageList.length-1){
        i = 0;
      }
      else{
        i++;
      }

      pic.src = imageList[i];
  }

pause =  setInterval(function() { showNewPic()}, 2000);
}
function stopSlide(){
  clearInterval(pause);
  document.getElementById("display4").src= "pelo.jpg";


}

var image = "ai.png";

  var map;

  var mapList = [joeLocation,andyLocation,derekLocation];
  var nameList = ["joe","andy","derek"];
 var map;
 var service;
 var infowindow;
 var infoWindow2;
 var markers = [];
 var currentLatLng;
 var currentLat;
 var currentLng;

 function initMap() {

  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setPanel(document.getElementById('left'));

   var uOfM = new google.maps.LatLng(44.9783 , -93.2332 );
   infowindow = new google.maps.InfoWindow();
   map = new google.maps.Map(
       document.getElementById('map'), {center: uOfM, zoom: 16});

   var geocoder = new google.maps.Geocoder();
   geocodeAddress(geocoder, map);
   //searchQuery();
   directionsRenderer.setMap(map);

   var onChangeHandler = function() {
     createRoute(directionsService, directionsRenderer);
   };
   var resetDirection = function() {
     searchQuery(directionsService, directionsRenderer);
   };
   document.getElementById('query').addEventListener('click', resetDirection);

  document.getElementById('search').addEventListener('click', onChangeHandler);
  infoWindow2 = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
         if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(function(position) {
             var pos = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
             };
             currentLat = position.coords.latitude;
             currentLng = position.coords.longitude;
              currentLatLng = position.coords.latitude.toString() + ", " + position.coords.longitude.toString() ;

           }, function() {
             handleLocationError(true, infoWindow2, map.getCenter());
           });
         } else {
           // Browser doesn't support Geolocation
           handleLocationError(false, infoWindow2, map.getCenter());
         }
       }
 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
   currentLatLng = "44.9783 , -93.2332"
   currentLat = 44.9783;
   currentLng = -93.2332;
 }


 function createRoute(directionsService, directionsRenderer) {
   directionsRenderer.setMap(map);

   clearMarkers();
  console.log(currentLatLng);
   var travel;
   var ele = document.getElementsByName('mode');

           for(i = 0; i < ele.length; i++) {
               if(ele[i].checked){
                 travel = ele[i].value;
                 console.log(ele[i].value);
               }
           }
         directionsService.route(
             {
               origin: {query: currentLatLng },
               destination: {query: document.getElementById('end').value},
               travelMode: travel
             },
             function(response, status) {
               if (status === 'OK') {
                 directionsRenderer.setDirections(response);
               } else {
                 window.alert('Directions request failed due to ' + status);
               }
             });
       }

 function searchQuery(directionsService, directionsRenderer){
   var request;
   directionsRenderer.setMap(null)
    clearMarkers();
     type = document.getElementById("select").value;
     extra = document.getElementById("extra").value;
     radius = document.getElementById("radius").value;
     if (type == "other"){
       request = {
           location:  {lat: currentLat, lng:  currentLng},
           radius: radius,
           type: type,
           keyword: extra
         };
     }
     else {
       request = {
           location:  {lat: currentLat, lng:  currentLng},
           radius: radius,
           type: type,

         };
     }
    console.log(type);
    console.log(extra);
    console.log(radius);



      service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }

          map.setCenter(results[0].geometry.location);
        }
      });
  }

 function setMapOnAll(map) {
   for (var i = 0; i < markers.length; i++) {
     markers[i].setMap(map);
   }
 }

 function clearMarkers() {
   setMapOnAll(null);
 }

 function showMarkers() {
   setMapOnAll(map);
 }
 function deleteMarkers() {
   clearMarkers();
   markers = [];
 }
 function createMarker(place) {
   var marker = new google.maps.Marker({
     map: map,
     position: place.geometry.location

   });
   markers.push(marker);
   google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(place.name);
     infowindow.open(map, this);
   });
 }




function geocodeAddress(geocoder, resultsMap) {

  for (i=0;i<mapList.length;i++){
    geocoder.geocode({'address': mapList[i]}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
                map.setZoom(14);
                var marker = new google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  icon:image

                });
                markers.push(marker);
                google.maps.event.addListener(marker, 'click', function() {
                  infowindow.setContent( results[0].formatted_address);
                  infowindow.open(map, marker);
                });
              }

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
