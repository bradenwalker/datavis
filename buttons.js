// Create array for buttons
var buttonArr = ['Rotation Period',
				 'Orbital Period',
				 'Diameter',
				 'Gravity',
				 'Population'];

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