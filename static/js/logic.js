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
        // layers.B_RATING,
        // layers.C_RATING
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
// Having a hard time with the icons
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

// Once the local JSON file is called, perform the anonymous function
d3.json('http://127.0.0.1:5000/data', function(restaurantsData) {
    var restaurantInfo = restaurantsData;
    // // Console.log() the restaurant names to test connection
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

    // Initialize a restaurantStatusCode, which will be used as a key to access the appropriate layers, icons, and restaurant count for layer group
    var restaurantStatusCode;

    // Loop through the restaurants 
    for (var i = 0; i < restaurantInfo.length; i++) {

        // Create a new restaurant object with properties from the list of arrays
        var restaurant = Object.assign({}, restaurantInfo[i]);
        // A Grade
        if (restaurant.GRADE == "A") {
            restaurantStatusCode = "A_RATING";
        }
        // B Grade
        else if (restaurant.GRADE == "B") {
            restaurantStatusCode = "B_RATING";
        }
        // C grade
        else {
            restaurantStatusCode = "C_RATING";
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
        "<p class='a-ratings'>'A' Food Safety Ratings: " + restaurantCount.A_RATING + "</p>",
        "<p class='b-ratings'>'B' Food Safety Ratings: " + restaurantCount.B_RATING + "</p>",
        "<p class='c-ratings'>'C' Food Safety Ratings: " + restaurantCount.C_RATING + "</p>",
        // "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
    ].join("");
}