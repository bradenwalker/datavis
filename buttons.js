// Create array for button labels
var buttonArr = ['Rotation-Period',
				 'Orbital-Period',
				 'Diameter',
				 'Gravity',
				 'Population'];

//Different datasets
var rotationData = ['24', '24', '24', '23', '23', '18', '26', '24', '27'];
var orbitalData = ['364', '481', '549', '341', '402', '312', '368', '463', '256'];
var diameterData = ['12500', '10200', '7200', '8900', '4900', '12120', '12240', '19720', '11370'];
var gravityData = ['1', '1', '1.1', '1.4', '0.85', '1', '1', '1', '0.9'];
var populationData = ['2000000000', '1000', '500', '250', '30000000', '4500000000', '1000000000000', '1000000000', '100000000000'];

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
             .range([0,h-(h*0.5)]);

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
      return 'rgb(' + (d * 4) + ',' + (d * 8) + ',' + (d * 4) + ')';
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

  svg.select('#units')
     .text('Rotation Period (hours)');
});

//Click event for Orbital Period
d3.select('#Orbital-Period').on('click', function() {
  d3.event.preventDefault();
  console.log('Clicked on Orbital Period');
  labelData = orbitalData;
  dataset = normalize(orbitalData, 5500);
  for (var i = 0; i < dataset.length; i++) {
      dataset[i] = dataset[i] / 10;
    }

  xScale = d3.scale.ordinal()
             .domain(d3.range(dataset.length))
             .rangeRoundBands([0,w], 0.05);

  yScale = d3.scale.linear()
             .domain([0,d3.max(dataset)])
             .range([50,h-20]);

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
      return 'rgb(' + (d * .05 * 2) + ',' + (d * .05 * 2) + ',' + (d * .05 * 8) + ')';
     });

  svg.selectAll('text')
     .data(dataset)
     .transition()
     .delay(function(d,i) {
      return i / dataset.length * 250;
     })
     .duration(500)
     .text(function(d) { return Math.floor(d); })
     .attr('x', function(d,i) {
      return (xScale(i) + xScale.rangeBand() / 2);
     })
     .attr('y', function(d) {
      return h - yScale(d) + 14;
     });

  svg.select('#units')
     .text('Orbital Period (days)');
});

//Click event for Diameter
d3.select('#Diameter').on('click', function() {
  d3.event.preventDefault();
  console.log('clicked on Rotation Period');
  dataset = normalize(diameterData, 20);

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
     .text(function(d,i) { return diameterData[i]; })
     .attr('x', function(d,i) {
      return (xScale(i) + xScale.rangeBand() / 2);
     })
     .attr('y', function(d) {
      return h - yScale(d) + 14;
     });

  svg.select('#units')
     .text('Diameter (km)');
});

//Click event for Gravity
d3.select('#Gravity').on('click', function() {
  d3.event.preventDefault();
  console.log('Clicked on Gravity');
  dataset = gravityData;

  xScale = d3.scale.ordinal()
             .domain(d3.range(dataset.length))
             .rangeRoundBands([0,w], 0.05);

  yScale = d3.scale.linear()
             .domain([0,d3.max(dataset)])
             .range([h*0.25,h-(h*0.1)]);

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
      return 'rgb(' + (d * 20 * 8) + ',' + (d * 20 * 1) + ',' + (d * 20 * 4) + ')';
     });

  svg.selectAll('text')
     .data(dataset)
     .transition()
     .delay(function(d,i) {
      return i / dataset.length * 250;
     })
     .duration(500)
     .text(function(d,i) { return d; })
     .attr('x', function(d,i) {
      return (xScale(i) + xScale.rangeBand() / 2);
     })
     .attr('y', function(d) {
      return h - yScale(d) + 14;
     });

  svg.select('#units')
     .text('Gravity ( * standard)');
});

//Click event for Population
d3.select('#Population').on('click', function() {
  d3.event.preventDefault();
  console.log('Clicked on Population');
  dataset = normalize(populationData, 10);

  xScale = d3.scale.ordinal()
             .domain(d3.range(dataset.length))
             .rangeRoundBands([0,w], 0.05);

  yScale = d3.scale.linear()
             .domain([0,d3.max(dataset)])
             .range([h*0.2,h-(h*0.25)]);

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
      return 'rgb(' + (d * 80) + ',' + (d * 10) + ',' + (d * 0) + ')';
     });

  svg.selectAll('text')
     .data(dataset)
     .transition()
     .delay(function(d,i) {
      return i / dataset.length * 250;
     })
     .duration(500)
     .text(function(d,i) { return populationData[i]; })
     .attr('x', function(d,i) {
      return (xScale(i) + xScale.rangeBand() / 2);
     })
     .attr('y', function(d) {
      return h - yScale(d) + 14;
     });

  svg.select('#units')
     .text('Population');
});