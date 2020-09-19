// Define SVG area dimensions
var svgWidth = 1560;
var svgHeight = 760;

// Define the chart's margins as an object
var chartMargin = {
    top: 20,
    right: 60,
    bottom: 80,
    left: 150
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from local flask
d3.json('/static/data/cuisine.json').then(function(newData) {

    console.log(newData);

    var list = [];
    var listData = [];

    var resData = [];

    Object.entries(newData).forEach(([k, v]) => {
        if (k == 'index') {
            list = v
        } else if (k == 'data') {
            listData = v
        }

    });

    list.map(function(l, i) {
        resData.push({ "name": l, "score": listData[i] })
    });

    /*
        resData = [{res1name : score}, {res2 : score}]
    */
    console.log(list, listData, resData);

    //var xScale = 1.25;
    //var yScale = 10;

    //var barwidth = (chartWidth - (xScale * (list.length - 1))) / list.length;

    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
        .domain(resData.map(d => d.name))
        .range([0, chartWidth])
        .padding(0.1);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(resData, d => d.score)])
        .range([chartHeight, 0]);

    // // Create two new functions passing our scales in as arguments
    // // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);


    // // Append two SVG group elements to the chartGroup area,
    // // and create the bottom and left axes inside of them
    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);


    // chartGroup.append("g")
    //     .attr("transform", `translate(0, ${chartWidth})`)
    //     .call(leftAxis);

    chartGroup.selectAll(".bar")
        .data(resData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => xBandScale(d.name))
        .attr("y", d => yLinearScale(d.score))
        .attr("width", xBandScale.bandwidth())
        .attr("height", d => chartHeight - yLinearScale(d.score));

}).catch(function(error) {
    console.log(error);
});