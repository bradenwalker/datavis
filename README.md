# datavis
Data visualization project using d3

##Star Wars Data Visualizer

####Basic Functionality
This app displays data for different starships from the Star Wars universe. Users can click on ships' names to see a bar chart that shows various characteristics for that ship, including cost, size, crew capacity and other  characteristics.

The data is displayed inside an SVG element. The data is bound to rect elements in the SVG using the d3 library (http://d3js.org). As users click on different ship names, the graph goes through an animated transition to display the new data.

####Future Plans
The app will make requests to the Star Wars API (http://swapi.co) to access data. Requests will be configured using SWAPI-Wrapper (https://github.com/cfjedimaster/SWAPI-Wrapper).
