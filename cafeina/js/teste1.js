// margin
var margin = { left:150, right:20, top:50, bottom:100 }

// dimensions
var width = 600 - margin.left - margin.right,
    height = 580 - margin.top - margin.bottom
    
// create svg
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " +
         margin.top + ")")

// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Quantidade em ml")

// Y Label
g.append("text")
    .attr("y", -130)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Bebida")

//Retrieve data
d3.csv("cafeina2.csv").then(function (data) {
data.forEach(function (d) {
    d.ml = +d.ml
})

// Sorting
data.sort(function (a, b) {
    return -a.ml - -b.ml
})
// Y Scale
var y = d3.scaleBand()
    .domain(data.map(function(d){ return d.Drink }))
    .range([0, width])
    .padding(0.2)
// X Scale
var x = d3.scaleLinear()
  .domain([0, 20+d3.max(data, function(d) { return d.ml})])
  .range([0, height])
// X Axis
var xAxisCall = d3.axisBottom(x)
    .tickFormat(function(d){ return  d + "ml"})
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")")
    .call(xAxisCall)
// Y Axis
var yAxisCall = d3.axisLeft(y)
    .tickFormat(function(d){ return  d})
g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall)
// Bars
var rects = g.selectAll("rect")
    .data(data)
       
rects.enter()
    .append("rect")
        .attr("x", function(d){ return x(d.width) })
        .attr("y", function(d){ return y(d.Drink) })
        .attr("width", function(d){ return x(d.ml) })
        .attr("height", y.bandwidth)
        .attr("fill", function (d) {
            if (d.Drink == "Coffee") {
                return "red"
            } else {
                return "black"
            }
        })
}).catch(function (error) {
    console.log(error)
    })