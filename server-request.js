//Client-side datasets
// var rotationData = ['24', '24', '24', '23', '23', '18', '26', '24', '27'];
// var orbitalData = ['364', '481', '549', '341', '402', '312', '368', '463', '256'];
// var diameterData = ['12500', '10200', '7200', '8900', '4900', '12120', '12240', '19720', '11370'];
// var gravityData = ['1', '1', '1.1', '1.4', '0.85', '1', '1', '1', '0.9'];
// var populationData = ['2000000000', '1000', '500', '250', '30000000', '4500000000', '1000000000000', '1000000000', '100000000000'];


var serverData;
//Blank version of datasets (will be populated by server)
var rotationData = [];
var orbitalData = [];
var diameterData = [];
var gravityData = [];
var populationData = [];

var body = document.body;
var btnDiv = document.getElementById('button_div');
var dataBtn = document.createElement('BUTTON');
dataBtn.innerHTML = "Get Data";
dataBtn.id = 'dataBtn';
var dataBtnDiv = document.createElement('DIV');
dataBtnDiv.id = "data_btn_div";
dataBtnDiv.classList.add('data_btn_div');
dataBtnDiv.appendChild(dataBtn);
body.insertBefore(dataBtnDiv, btnDiv);
var spinner = document.createElement('IMG');
spinner.setAttribute('src', 'loading.gif');
spinner.setAttribute('height', '25px');
spinner.setAttribute('width', '25px');
var successText = document.createElement('P');
successText.innerHTML = "Data loaded!";


//Send get request
dataBtn = document.getElementById('dataBtn');
dataBtn.onclick = function () {
	console.log('Clicked it. (¬‿¬)');
	dataBtn.setAttribute('style', 'opacity:0');
	dataBtnDiv.appendChild(spinner);

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		
		if(httpRequest.readyState === 4) {
			if(httpRequest.status === 200) {
				serverData = JSON.parse(httpRequest.responseText);
				console.log(serverData);
				parseServerData();
				spinner.setAttribute('style', 'opacity:0');
				body.insertBefore(successText, btnDiv);
			} else {
				console.error('Error: ' + httpRequest.status);
			}
		}
	};
	httpRequest.open('GET', 'http://swapi.co/api/planets/', true);
	httpRequest.send(null);
};


//Parse server data and populate client-side datasets
var parseServerData = function () {
	for (var i = 0; i < serverData.results.length; i++) {
		rotationData.push(serverData.results[i].rotation_period);
		orbitalData.push(serverData.results[i].orbital_period);
		diameterData.push(serverData.results[i].diameter);
		gravityData.push(serverData.results[0].gravity.slice(0,1));
		if(serverData.results[i].population !== 'unknown') {
			populationData.push(serverData.results[i].population);
		} else {
			populationData.push('0');
		}
	}
	console.log(populationData);
};












