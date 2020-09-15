// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  A_RATING: new L.LayerGroup(),
  B_RATING: new L.LayerGroup(),
  C_RATING: new L.LayerGroup()
};



// Create the map with our layers
// map_id is the div in the HTML
var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [
    // the layers that will show on load
    layers.A_RATING,
    layers.B_RATING,
    layers.C_RATING
  ]
});



// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "A Rating": layers.A_RATING,
  "B Rating": layers.B_RATING,
  "C Rating": layers.C_RATING
};



// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  A_RATING: L.ExtraMarkers.icon({
    icon: "checkmark-done-outline",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  B_RATING: L.ExtraMarkers.icon({
    icon: "checkmark-outline",
    iconColor: "white",
    markerColor: "yellow",
    shape: "circle"
  }),
  C_RATING: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  })
};






// When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
d3.json('restaurantsNYC_italian_mexican.json', function(restaurantsData) {
  var restaurantInfo = restaurantsData;
  // for (var i = 0; i < restaurantInfo.length; i++) {
  //   var restaurant = Object.assign({}, restaurantInfo[i]);
  //   console.log(restaurant.DBA)
  // }

  // Create an object to keep of the number of markers in each layer
  var restaurantCount = {
    A_RATING: 0,
    B_RATING: 0,
    C_RATING: 0
  };

  // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
  var restaurantStatusCode;

  // Loop through the stations (they're the same size and have partially matching data)
  for (var i = 0; i < restaurantInfo.length; i++) {

    // Create a new station object with properties of both station objects
    var restaurant = Object.assign({}, restaurantInfo[i]);
    // If a station is listed but not installed, it's coming soon
    if (restaurant.GRADE == "A") {
      restaurantStatusCode = "A_RATING";
    }
    // If a station has no bikes available, it's empty
    // note the "!"
    else if (restaurant.GRADE == "B") {
      restaurantStatusCode = "B_RATING";
    }
    // Otherwise the station is normal
    else {
      restaurantStatusCode = "C_RATING";
    }

    // Update the station count
    restaurantCount[restaurantStatusCode]++;
    // Create a new marker with the appropriate icon and coordinates
    var newMarker = L.marker([restaurant.Latitude, restaurant.Longitude], {
      icon: icons[restaurantStatusCode]
    });

    // Add the new marker to the appropriate layer
    newMarker.addTo(layers[restaurantStatusCode]);

    // Bind a popup to the marker that will  display on click. This will be rendered as HTML
    newMarker.bindPopup(restaurant.DBA + "<br> Cuisine: " + restaurant["CUISINE DESCRIPTION"] + "<br> Food Safety Grade: " + restaurant.GRADE);
  }

  // Call the updateLegend function, which will... update the legend!
  updateLegend(restaurantCount);
});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(restaurantCount) {
  document.querySelector(".legend").innerHTML = [
    // "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    // "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
    "<p class='a-ratings'>'A' Food Safety Ratings: " + restaurantCount.A_RATING + "</p>",
    "<p class='b-ratings'>'B' Food Safety Ratings: " + restaurantCount.B_RATING + "</p>",
    "<p class='c-ratings'>'C' Food Safety Ratings: " + restaurantCount.C_RATING + "</p>",
    // "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
  ].join("");
}
