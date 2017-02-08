smoothScroll.init();

// Map API for Contacts page

function initMap() {
  
  var myLatLng = {lat: 38.605396, lng: -90.345761};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 15,
    disableDefaultUI: true,
    draggable: false,
    zoomControl: false
  });

  var marker = new google.maps.Marker({
  	position: myLatLng,
  	map: map,
  	title: 'St. Louis Wellness Center'
  });

}