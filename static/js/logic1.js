// // Store our USGS earthquake API endpoint for the past 30 days inside queryUrl 
// var queryUrl = "http://127.0.0.1:5000/data.json";

// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//     console.log(data);
// });


// // An array which will be used to store created cityMarkers
// var cityMarkers = [];

// for (var i = 0; i < cities.length; i++) {
//     // loop through the cities array, create a new marker, push it to the cityMarkers array
//     cityMarkers.push(
//         L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
//     );
// }
// function createMap(resLoc) {

//     // Create the tile layer that will be the background of our map
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "light-v10",
//         accessToken: API_KEY
//     });

//     // Create a baseMaps object to hold the lightmap layer
//     var baseMaps = {
//         "Light Map": lightmap
//     };

//     // Create an overlayMaps object to hold the bikeStations layer
//     var overlayMaps = {
//         "Restaurants Locations": resLoc
//     };

//     // Create the map object with options
//     var map = L.map("map", {
//         center: [40.73, -74.0059],
//         zoom: 12,
//         layers: [lightmap, resLoc]
//     });

//     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(map);
// }

// function createMarkers(response) {


//     var cityMarkers = [];

//     for (var i = 0; i < data.length; i++) {
//         // loop through the cities array, create a new marker, push it to the cityMarkers array
//         cityMarkers.push(
//             L.marker(data[i].DBA).bindPopup("<h1>" + data[i].ZIPCODE + "</h1>")
//         );
//     }

//     // // Pull the "stations" property off of response.data
//     // var stations = response.data.dba;

//     // // Initialize an array to hold bike markers
//     // var bikeMarkers = [];

//     // // Loop through the stations array
//     // for (var index = 0; index < stations.length; index++) {
//     //     var station = stations[index];

//     //     // For each station, create a marker and bind a popup with the station's name
//     //     var bikeMarker = L.marker([station.lat, station.lon])
//     //         .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");


//     //     // Add the marker to the bikeMarkers array
//     //     bikeMarkers.push(bikeMarker);
//     // }

//     // Create a layer group made from the bike markers array, pass it into the createMap function
//     createMap(L.layerGroup(cityMarkers));
// }
// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//     top: 20,
//     right: 40,
//     bottom: 80,
//     left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//     .select("#map-id")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);


// // Append an SVG group
// var chartGroup = svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);



// Creating map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
});

// Adding tile layer
// https://api.mapbox.com/styles/v1/kli99/ckewexiph03fw1ao0nx0k9f3q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2xpOTkiLCJhIjoiY2tlZGxtNDFqMGk5dDM1azlpMHVwbnk2YSJ9.PYjXx4q4ceRv1OjQZCNKKw
L.tileLayer("https://api.mapbox.com/styles/v1/kli99/ckf7grp830hhj19o0akmngp5m/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2xpOTkiLCJhIjoiY2tlZGxtNDFqMGk5dDM1azlpMHVwbnk2YSJ9.PYjXx4q4ceRv1OjQZCNKKw", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 120,
    maxZoom: 18,
    // zoomOffset: -1,
    id: "mapbox/streets-v11",
    // accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
var link = "static/data/dataset.json";

// Our style object
var mapStyle = {
    color: "white",
    fillColor: "pink",
    fillOpacity: 0.5,
    weight: 1.5
};

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
    console.log(data);
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        // Passing in our style object
        style: mapStyle
    }).addTo(myMap);
});