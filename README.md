# datavis
Data visualization project using d3

##Star Wars Data Visualizer

####Basic Functionality
This app displays data for different planets from the Star Wars universe. Users can click on different measurements to see a bar chart that shows various characteristics for the planets, including diameter, and population.

The data is displayed inside an SVG element. The data is bound to rect elements in the SVG using the d3 library (http://d3js.org). As users click on different statistics, the graph goes through an animated transition to display the new data sets.

The app makes a request to the Star Wars API (http://swapi.co) to access planet data.
