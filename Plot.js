
// Set up the SVG container
var width = 600;
var height = 400;
var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Set up the scales
var xScale = d3.scaleLinear()
  .range([50, width - 50]);

var yScale = d3.scaleLinear()
  .range([height - 50, 50]);

var rScale = d3.scaleSqrt()
  .range([3, 15]);

// Set up the axes
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

// Load the data from the CSV file
d3.csv("data.csv").then(function(data) {
  // Convert string data to numbers
  data.forEach(function(d) {
    d.density = +d.density;
    d.population = +d.population;
    d.growth = +d.growth;
  });

  // Update the scales with the data domain
  xScale.domain(d3.extent(data, function(d) { return d.density; }));
  yScale.domain(d3.extent(data, function(d) { return d.growth; }));
  rScale.domain(d3.extent(data, function(d) { return d.population; }));

  // Add the bubbles to the scatter plot
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(d.density); })
    .attr("cy", function(d) { return yScale(d.growth); })
    .attr("r", function(d) { return rScale(d.population); })
    .style("fill", "steelblue");

  // Add the x-axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (height - 50) + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", width - 50)
    .attr("y", -10)
    .style("text-anchor", "end")
    .text("Density");

  // Add the y-axis
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(50,0)")
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", 10)
    .attr("y", 10)
    .style("text-anchor", "start")
    .text("Population Growth");
});
