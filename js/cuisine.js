// set the dimensions of the canvas
// var margin = {top: 20, right: 20, bottom: 70, left: 40},
//     width = 600 - margin.left - margin.right,
//     height = 300 - margin.top - margin.bottom;


// // set the ranges
// // var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

// // var y = d3.scale.linear().range([height, 0]);

// // define the axis
// // var xAxis = d3.svg.axis()
// //     .scale(x)
// //     .orient("bottom")


// // var yAxis = d3.svg.axis()
// //     .scale(y)
// //     .orient("left")
// //     .ticks(10)
// //     .innerTickSize(-width)
// //     .outerTickSize(0)
// //     .tickPadding(10);

// // add the SVG element
// var svg     = d3.select("cuisine")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// load the data
d3.json("assets/data/restaurant.json").then(function(data){
        console.log(data)
        
        var xBandScale = d3.scaleBand()
        .domain(data.map(d => d["CUISINE DESCRIPTION"]))
        .range([0, chartWidth])
        .padding(0.1);

        // Create a linear scale for the vertical axis.
        var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d["SCORE"])])
        .range([chartHeight, 0]);

        // Create two new functions passing our scales in as arguments
        // These will be used to create the chart's axes
        var bottomAxis = d3.axisBottom(xBandScale);
        var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

        
        // x.domain(data.map(function (d)
        // {
        //     return d["CUISINE DESCRIPTION"];
        // }));

        // y.domain([0, d3.max(data, function (d)
        // {
        //     return d["SCORE"];
        // })]);

        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0, " + height + ")")
        //     .call(xAxis)
        //     .selectAll("text")
        //     .style("text-anchor", "middle")
        //     .attr("dx", "-0.5em")
        //     .attr("dy", "-.55em")
        //     .attr("y", 30)
        //     .attr("transform", "rotate(0)" );

        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(yAxis)
        //     .append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 5)
        //     .attr("dy", "0.8em")
        //     .attr("text-anchor", "end")
        //     .text("Average Score");

        // svg.selectAll("bar")
        //     .data(data)
        //     .enter()
        //     .append("rect")
        //     .style("fill", "orange")
        //     .attr("x", function(d)
        //     {
        //         return x(d["CUISINE DESCRIPTION"]);
        //     })
        //     .attr("width", x.rangeBand())
        //     .attr("y", function (d)
        //     {
        //         return y(d["SCORE"]);
        //     })
        //     .attr("height", function (d)
        //     {
        //         return height - y(d["SCORE"]);
        //     })

        chartGroup.append("g")
        .call(leftAxis);
        
        chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
        
          // Create one SVG rectangle per piece of tvData
          // Use the linear and band scales to position each rectangle within the chart
          chartGroup.selectAll(".cusine")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xBandScale(d["CUISINE DESCRIPTION"]))
            .attr("y", d => yLinearScale(d["SCORE"]))
            .attr("width", xBandScale.bandwidth())
            .attr("height", d => chartHeight - yLinearScale(d["SCORE"]));
        
        }).catch(function(error) {
            console.log(error);
    });
          
        
