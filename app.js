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

var dataset = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];

var labeldata = dataset;

//Normalize data
var normalize = function(arr, val) {
  var normDataset = [];

  var max = function (arr) {
    return Math.max.apply(null, arr);
  };

  for (var i = 0; i < arr.length; i++) {
    normDataset[i] = Math.round( arr[i] / max(arr) * val );
  }

  return normDataset;
};

dataset = normalize(dataset, 20);

//Set up SVG height and width
var w = 800;
var h = 300;
var padding = 40;

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
                  'Bespin',
                  'Endor',
                  'Naboo',
                  'Coruscant',
                  'Kamino',
                  'Geonosis'];

//Set up units
var units = '';

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
              .attr('y', '0')
              .attr('width', xScale.rangeBand())
              .attr('height', '0');


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
                  return 0;
                })
                .attr('fill', 'white')
                .attr('font-size', '10px')
                .attr('text-anchor', 'middle');

//Generate x-axis
svg.append('g')
   .attr('class', 'axis')
   .attr('transform', 'translate(0,' + (h - padding) + ')')
   .call(xAxis);

//Generate units
svg.append('text')
   .attr('font-weight', 'bold')
   .attr('font-size', '14px')
   .attr('text-anchor', 'middle')
   .attr('id', 'units')
   .attr('transform', 'translate(' + w / 2 + ',' + (h - padding * 0.1) + ')')
   .text(units);

