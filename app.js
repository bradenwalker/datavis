//Practice bar graph

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

//Setting up graph scale
var scale = d3.scale.linear();
scale.domain([5,25]);
scale.range(20,180);                

var w = 500;
var h = 200;
var barPadding = 2;

var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

var rects = svg.selectAll('rect')
              .data(dataset)
              .enter()
              .append('rect')
              .attr('x', function(d,i) {
                return i * (w / dataset.length);
              })
              .attr('y', function(d) {
                return h - (d * 4);
              })
              .attr('width', 
                w / dataset.length - barPadding)
              .attr('height', function(d) {
                return d * 4;
              })
              .attr('fill', function(d) {
                return 'rgb(0,0,' + (d * 10) + ')';
              });

var labels = svg.selectAll('text')
                .data(dataset)
                .enter()
                .append('text')
                .text(function(d) { return d; })
                .attr('x', function(d,i) {
                  return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
                })
                .attr('y', function(d) {
                  return h - (d * 4) + 14;
                })
                .attr('fill', 'white')
                .attr('font-family', 'sans-serif')
                .attr('font-size', '11px')
                .attr('text-anchor', 'middle');

// Testing SWAPI Get Request
// swapiModule.getPeople([1], function(data) {
//   console.log(data);
// });