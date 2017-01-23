var map;      
function initMap() {
    map = new google.maps.Map(document.getElementById('map-area'), {
      center: {lat: 1.2745927, lng: 103.8431704},
      zoom: 13
    });
    
    var contentString = '<b>Address</b>' +
        '<p>60 Anson Road, #09-01 Mapletree Anson<br/>' +
        'Singapore 079914</p>' + 
        '<b>Operating Hours :</b>' +
        '<p>Mon - Fri: 9am - 5:30pm</p>';
    
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(1.2745927, 103.8431704),
        map: map
    });
    
    infowindow.open(map, marker);
    
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

}
google.maps.event.addDomListener(window, 'load', initMap);