// Retrieve data

// d3.csv("cafeina.csv").then(function(data) {
//     console.log(data);
// });
// d3.tsv("data/ages.tsv").then(function(data){


d3.csv("cafeina.csv").then(function(data) {
    console.log(data)
    data.forEach(function(d) {
        d.ml = +d.ml;
    });
    // Sorting
    data.sort(function(a, b) {
            return -a.ml - -b.ml
        })
        // var y - scales
    var y = d3.scaleLinear()
        .domain([0, 350])
        .range([0, 400]);

    // var y = d3.scaleLog()
    //     .domain([0, 350])
    //     .range([0, 400])
    //     .log([10]);

    // Create the SVG
    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 1600);
    // Create the rects
    var rects = svg.selectAll("rect")
        .data(data);
    // Set data
    rects.enter()
        .append("rect")
        .attr("y", function(d, i) {
            console.log(d);
            return (i * 30) + 25;
        })
        .attr("x", 25)
        .attr("width", function(d) {
            return y(d.ml);
        })
        .attr("height", 15)
        .attr("fill", function(d) {
            if (d.Drink == "Coffee") {
                return "black";
            } else {
                return "red";
            }
        });


}).catch(function(error) {
    console.log(error);
})