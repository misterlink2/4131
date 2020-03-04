function initMap() {
  var uOfM = new google.maps.LatLng(44.9783 , -93.2332 );
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(
      document.getElementById('map'), {center: uOfM, zoom: 15});
  var geocoder = new google.maps.Geocoder();
  google.maps.event.addListener(map, 'click', function(event) {
  geocoder.geocode({
    'latLng': event.latLng
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
      document.getElementById("address").value =  results[0].formatted_address;
      }
    }
  });
});
}
