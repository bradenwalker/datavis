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

//Sample SWAPI dataset
var dataset = ['12500', '10200', '7200', '8900', '4900', '12120', '12240'];

var labeldata = dataset;

//Normalize data
var normalize = function(arr) {
  var normDataset = [];

  var max = function (arr) {
    return Math.max.apply(null, arr);
  };

  for (var i = 0; i < arr.length; i++) {
    normDataset[i] = Math.round( arr[i] / max(arr) * 20 );
  }

  return normDataset;
};

dataset = normalize(dataset);

//Set up SVG height and width
var w = 600;
var h = 300;
var padding = 20;

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
             .range([h*0.1,h-(h*0.25)]);                             

//Set up custom axis tick labels
var axisLabels = ['Alderaan', 
                  'Yavin IV',
                  'Hoth',
                  'Dagobah',
                  'Endor',
                  'Naboo',
                  'Coruscant'];

//Set up units
var units = 'Kamino'

var formatLabel = function(d) {
  return axisLabels[d % axisLabels.length];
};

//Set up horizontal axis
var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient('bottom')
              .tickFormat(formatLabel);

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
                return (yScale(d) - padding);
              })
              .attr('fill', function(d) {
                return 'rgb(' + (d * 8) + ',' + (d * 6) + ',' + (d * 4) + ')';
              });


//Text labels for graph bar data
var labels = svg.selectAll('text')
                .data(dataset)
                .enter()
                .append('text')
                .text(function(d,i) { return labeldata[i]; })
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

//Generate axes
svg.append('g')
   .attr('class', 'axis')
   .attr('transform', 'translate(0,' + (h - padding) + ')')
   .call(xAxis);

//Test button to change data
d3.select('.changeBtn').on('click', function() {
  d3.event.preventDefault();
  dataset = randData(5);

  xScale = d3.scale.ordinal()
             .domain(d3.range(dataset.length))
             .rangeRoundBands([0,w], 0.05);

  yScale = d3.scale.linear()
             .domain([0,d3.max(dataset)])
             .range([0,h-(h*0.1)]);

  svg.selectAll('rect')
     .data(dataset)
     .transition()
     .delay(function(d,i) {
      return i / dataset.length * 250;
     })
     .duration(500)
     .attr('y', function(d) {
      return ( h - yScale(d) );
     })
     .attr('height', function(d) {
      return (yScale(d) - padding);
     })
     .attr('fill', function(d) {
      return 'rgb(' + (d * 8) + ',' + (d * 6) + ',' + (d * 4) + ')';
     });

  svg.selectAll('text')
     .data(labeldata)
     .transition()
     .delay(function(d,i) {
      return i / dataset.length * 250;
     })
     .duration(500)
     .text(function(d) { return d; })
     .attr('x', function(d,i) {
      return (xScale(i) + xScale.rangeBand() / 2);
     })
     .attr('y', function(d) {
      return h - yScale(d) + 14;
     });
});









