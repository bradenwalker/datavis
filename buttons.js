// Create array for button labels
var buttonArr = ['Gravity',
				 'Orbital-Period',
				 'Rotation-Period',
				 'Diameter',
				 'Population'];



//Attach buttons to DOM
// d3.select('body')
//   .append('div')
//   .attr('id', 'button_div');
var button_div = document.createElement('DIV');
button_div.id = 'button_div';
var the_svg = document.querySelector('svg');
document.body.insertBefore(button_div, the_svg);

d3.selectAll('#button_div')
  .selectAll('button')
  .data(buttonArr)
  .enter()
  .append('button')
  .attr('id', function(d) {return d;})
  .text(function(d) {
  	return d;
  });

//Click event for Rotation Period
d3.select('#Rotation-Period').on('click', function() {
  d3.event.preventDefault();
  console.log('Clicked on Rotation Period');
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
  dataset = normalize(orbitalData, 51125);
  for (var i = 0; i < dataset.length; i++) {
      dataset[i] = dataset[i] / 10;
    }

  xScale = d3.scale.ordinal()
             .domain(d3.range(dataset.length))
             .rangeRoundBands([0,w], 0.05);

  yScale = d3.scale.linear()
             .domain([0,d3.max(dataset)])
             .range([100,h-20]);

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
      if (d < 1000) {
        return 'rgb(' + (d * .05 * 2) + ',' + (d * .05 * 2) + ',' + (d/2 * .05 * 8) + ')';
      } else {
        return 'rgb(' + (d/10 * .05 * 2) + ',' + (d/50 * .05 * 2) + ',' + (d/10 * .05 * 8) + ')';
      }
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
             .range([100,h-(h*0.1)]);

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
      if (d < 10) {
        var multiplier = 10;
        return 'rgb(' + (d * multiplier * 8) + ',' + (d * multiplier * 6) + ',' + (d * multiplier * 4) + ')';
      } else {
        var limiter = .55;
        return 'rgb(' + (d/limiter * 8) + ',' + (d/limiter * 6) + ',' + (d/limiter * 4) + ')'; 
      }
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

//Refactor to one "click" function
// var changeOnClick = function (buttonID, newDataSet, normalizeTF, normVal, minRange, maxRange, rVal, gVal, bVal, unitText) {
//   if (normalizeTF) {
//     dataset = normalize(newDataSet, normVal);
//   } else {
//     dataset = newDataSet;
//   }
  
//   d3.select(buttonID).on('click', function() {
//   d3.event.preventDefault();
//   console.log('Clicked on ' + buttonID);

//   yScale = d3.scale.linear()
//              .domain([0,d3.max(dataset)])
//              .range([minRange, maxRange]);

//   svg.selectAll('rect')
//      .data(dataset)
//      .transition()
//      .delay(function(d,i) {
//       return i / dataset.length * 250;
//      })
//      .duration(500)
//      .attr('y', function(d) {
//       return ( h - yScale(d) );
//      })
//      .attr('height', function(d) {
//       return (yScale(d) - padding);
//      })
//      .attr('fill', function(d) {
//       return 'rgb(' + (d * rVal) + ',' + (d * gVal) + ',' + (d * bVal) + ')';
//      });

//   svg.selectAll('text')
//      .data(dataset)
//      .transition()
//      .delay(function(d,i) {
//       return i / dataset.length * 250;
//      })
//      .duration(500)
//      .text(function(d,i) { return newDataSet[i]; })
//      .attr('x', function(d,i) {
//       return (xScale(i) + xScale.rangeBand() / 2);
//      })
//      .attr('y', function(d) {
//       return h - yScale(d) + 14;
//      });

//   svg.select('#units')
//      .text(unitText);
//   });
// };

// changeOnClick('#Rotation-Period', rotationData, false, null, 0, h-(h*0.5), 4, 8, 4, 'Rotation (Hours)');

// changeOnClick('#Orbital-Period', orbitalData, true, 5500, 50, h-20, 0.05 * 2, 0.05 * 2, 0.05 * 8, 'Orbital Period (Days)');
