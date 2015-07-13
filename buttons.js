// Create array for button labels
var buttonArr = ['Rotation-Period',
				 'Orbital-Period',
				 'Diameter',
				 'Gravity',
				 'Population'];

//Different datasets
var rotationData = ['24', '24', '24', '23', '23', '18', '26', '24', '27']
var orbitalData = ['364', '4818', '549', '341', '402', '312', '368', '463', '256'];

//Attach buttons to DOM
d3.select('body')
  .append('div')
  .attr('id', 'button_div');

d3.selectAll('#button_div')
  .selectAll('button')
  .data(buttonArr)
  .enter()
  .append('button')
  .attr('id', function(d) {return d;})
  .text(function(d) {
  	return d;
  });

//Test click event for Rotation Period
d3.select('#Rotation-Period').on('click', function() {
  d3.event.preventDefault();
  console.log('clicked on Rotation Period');
  dataset = rotationData;

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
     .data(dataset)
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

//Click event for Orbital Period
d3.select('#Orbital-Period').on('click', function() {
  d3.event.preventDefault();
  console.log('clicked on Rotation Period');
  labelData = orbitalData;
  for (var i = 0; i < orbitalData.length; i++) {
      dataset[i] = orbitalData[i] / 10;
    }

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
     .data(dataset)
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