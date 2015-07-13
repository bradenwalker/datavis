//Initialize data set
var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

//Random data generator
var randData = function(numElements) {
  var newArr = [];

  var randNum = function (max) {
    return ( Math.floor( Math.random() * (max - 5) ) + 5 );
  };

  for (var i = 1; i <= numElements; i++) {
    newArr.push(randNum(25));
  }

  return newArr;
};

//Set up SVG height and width
var w = 600;
var h = 300;
var barPadding = 1;

var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

//Set up horizontal and vertical scale
var xScale = d3.scale.ordinal()
             .domain(d3.range(dataset.length))
             .rangeRoundBands([0,w], 0.05);


var yScale = d3.scale.linear()
             .domain([0,d3.max(dataset)])
             .range([0,h-(h*0.1)]);                             

//Create graph bars
var rects = svg.selectAll('rect')
              .data(dataset)
              .enter()
              .append('rect')
              .attr('x', function(d,i) {
                return xScale(i);
              })
              .attr('y', function(d) {
                return ( h - yScale(d) );
              })
              .attr('width', xScale.rangeBand())
              .attr('height', function(d) {
                return yScale(d);
              })
              .attr('fill', function(d) {
                return 'rgb(0,0,' + (d * 10) + ')';
              });


//Text labels for graph bar data
var labels = svg.selectAll('text')
                .data(dataset)
                .enter()
                .append('text')
                .text(function(d) { return d; })
                .attr('x', function(d,i) {
                  return (xScale(i) + xScale.rangeBand() / 2);
                })
                .attr('y', function(d) {
                  return h - (yScale(d)) + 14;
                })
                .attr('fill', 'white')
                .attr('font-family', 'sans-serif')
                .attr('font-size', '11px')
                .attr('text-anchor', 'middle');


//Test button to change data
d3.select('.changeBtn').on('click', function() {
  d3.event.preventDefault();
  dataset = randData(20);

  xScale = d3.scale.ordinal()
             .domain(d3.range(dataset.length))
             .rangeRoundBands([0,w], 0.05);

  yScale = d3.scale.linear()
             .domain([0,d3.max(dataset)])
             .range([0,h-(h*0.1)]);

  svg.selectAll('rect')
     .data(dataset)
     .transition()
     .duration(1000)
     .attr('y', function(d) {
      return ( h - yScale(d) );
     })
     .attr('height', function(d) {
      return yScale(d);
     })
     .attr('fill', function(d) {
      return ('rgb(0,0,' + (d * 10) + ')');
     });

  svg.selectAll('text')
     .data(dataset)
     .transition()
     .duration(1000)
     .text(function(d) { return d; })
     .attr('x', function(d,i) {
      return (xScale(i) + xScale.rangeBand() / 2);
     })
     .attr('y', function(d) {
      return h - yScale(d) + 14;
     });
});









