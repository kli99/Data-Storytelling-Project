// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  AMERICAN: new L.LayerGroup(),
  BRAZILIAN: new L.LayerGroup(),
  CHINESE: new L.LayerGroup(),
  FRENCH: new L.LayerGroup(),
  GREEK: new L.LayerGroup(),
  INDIAN: new L.LayerGroup(),
  ITALIAN: new L.LayerGroup(),
  JAPANESE: new L.LayerGroup(),
  KOREAN: new L.LayerGroup(),
  MEDITERRANEAN: new L.LayerGroup(),
  MEXICAN: new L.LayerGroup(),
  SPANISH: new L.LayerGroup(),
  THAI: new L.LayerGroup()
};

// Create the map with our layers
// map_id is the div in the HTML
var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [
    // the layers that will show on load
    layers.AMERICAN,
    // layers.BRAZILIAN,
    // layers.CHINESE,
    // layers.FRENCH,
    // layers.GREEK,
    // layers.INDIAN,
    // layers.ITALIAN,
    // layers.JAPANESE,
    // layers.KOREAN,
    // layers.MEDITERRANEAN,
    // layers.MEXICAN,
    // layers.SPANISH,
    // layers.THAI
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "American": layers.AMERICAN,
  "Brazilian": layers.BRAZILIAN,
  "French": layers.FRENCH,
  "Greek": layers.GREEK,
  "Indian": layers.INDIAN,
  "Italian": layers.ITALIAN,
  "Japanese": layers.JAPANESE,
  "Korean": layers.KOREAN,
  "Mediterranean": layers.MEDITERRANEAN,
  "Mexican": layers.MEXICAN,
  "Chinese": layers.SPANISH,
  "Chinese": layers.THAI
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomleft"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
// Having a hard time with the icons
var icons = {
  AMERICAN: L.ExtraMarkers.icon({
    icon: "checkmark-done-outline",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  BRAZILIAN: L.ExtraMarkers.icon({
    icon: "checkmark-outline",
    iconColor: "white",
    markerColor: "yellow",
    shape: "circle"
  }),
  CHINESE: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "red",
    shape: "circle",
  }),
  FRENCH: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "white",
    shape: "circle",
  }),
  GREEK: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle",
  }),
  INDIAN: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle",
  }),
  ITALIAN: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "red",
    shape: "circle",
  }),
  JAPANESE: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "red",
    shape: "circle",
  }),
  KOREAN: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle",
  }),
  MEDITERRANEAN: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle",
  }),
  MEXICAN: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "green, red",
    shape: "circle",
  }),
  SPANISH: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle",
  }),
  THAI: L.ExtraMarkers.icon({
    icon: "close-outline",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle",
  })
};

// Once the local JSON file is called, perform the anonymous function
d3.json('restaurantsNYC_expanded.json', function(restaurantsData) {
  
  var restaurantInfo = restaurantsData;
  // // Console.log() the restaurant names to test connection
  // for (var i = 0; i < restaurantInfo.length; i++) {
  //   var restaurant = Object.assign({}, restaurantInfo[i]);
  //   console.log(restaurant.DBA)
  // }

  // Create an object to keep of the number of markers in each layer
  var restaurantCount = {
    AMERICAN: 0,
    BRAZILIAN: 0,
    CHINESE: 0,
    FRENCH: 0,
    GREEK: 0,
    INDIAN: 0,
    ITALIAN: 0,
    JAPANESE: 0,
    KOREAN: 0,
    MEDITERRANEAN: 0,
    MEXICAN: 0,
    SPANISH: 0,
    THAI: 0
  };

  // Initialize a restaurantStatusCode, which will be used as a key to access the appropriate layers, icons, and restaurant count for layer group
  var restaurantStatusCode;

  // Loop through the restaurants 
  for (var i = 0; i < restaurantInfo.length; i++) {

    // Create a new restaurant object with properties from the list of arrays
    var restaurant = Object.assign({}, restaurantInfo[i]);
    if (restaurant.GRADE == "A") {
      // AMERICAN
      if (restaurant["CUISINE DESCRIPTION"] == "American") {
        restaurantStatusCode = "AMERICAN";
      }
      // Brazilian
      else if (restaurant["CUISINE DESCRIPTION"] == "Brazilian") {
        restaurantStatusCode = "BRAZILIAN";
      }
      // Chinese
      else if (restaurant["CUISINE DESCRIPTION"] == "Chinese") {
        restaurantStatusCode = "CHINESE";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "French") {
        restaurantStatusCode = "FRENCH";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "Greek") {
        restaurantStatusCode = "GREEK";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "Indian") {
        restaurantStatusCode = "INDIAN";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "Italian") {
        restaurantStatusCode = "ITALIAN";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "Japanese") {
        restaurantStatusCode = "JAPANESE";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "Korean") {
        restaurantStatusCode = "KOREAN";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "Mediterranean") {
        restaurantStatusCode = "MEDITERRANEAN";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "Mexican") {
        restaurantStatusCode = "MEXICAN";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "Spanish") {
        restaurantStatusCode = "SPANISH";
      }
      // 
      else if (restaurant["CUISINE DESCRIPTION"] == "Thai") {
        restaurantStatusCode = "THAI";
      }

    }
    

    // Update the restaurant count
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
    // // Code from class exercise below
    // "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    // "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
    "<p class='american-restaurants'>American Restaurants: " + restaurantCount.AMERICAN + "</p>",
    "<p class='brazilian-restaurants'>Brazilian Restaurants: " + restaurantCount.BRAZILIAN + "</p>",
    "<p class='chinese-restaurants'>Chinese Restaurants: " + restaurantCount.CHINESE + "</p>",
    "<p class='french-restaurants'>French Restaurants: " + restaurantCount.French + "</p>",
    "<p class='greek-restaurants'>Greek Restaurants: " + restaurantCount.Greek + "</p>",
    "<p class='indian-restaurants'>Indian Restaurants: " + restaurantCount.INDIAN + "</p>",
    "<p class='italian-restaurants'>Italian Restaurants: " + restaurantCount.ITALIAN + "</p>",
    "<p class='japanese-restaurants'>Japanese Restaurants: " + restaurantCount.JAPANESE + "</p>",
    "<p class='korean-restaurants'>Korean Restaurants: " + restaurantCount.KOREAN + "</p>",
    "<p class='mediterranean-restaurants'>Mediterranean Restaurants: " + restaurantCount.MEDITERRANEAN + "</p>",
    "<p class='mexican-restaurants'>Mexican Restaurants: " + restaurantCount.MEXICAN + "</p>",
    "<p class='spanish-restaurants'>Spanish Restaurants: " + restaurantCount.SPANISH + "</p>",
    "<p class='thai-restaurants'>Thai Restaurants: " + restaurantCount.THAI + "</p>",
    // "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
  ].join("");
}
