//QUADRANT CODES

// create data


function buildchart(data1){

}
anychart.onDocumentReady(function () {

	var data = [
		{x: 4, value: 42},
		{x: 13, value: 59},
		{x: 25, value: 68},
		{x: 25, value: 63},
		{x: 44, value: 54},
		{x: 55, value: 58},
		{x: 56, value: 46},
		{x: 60, value: 54},
		{x: 72, value: 73}
	  ];

	// create a chart
	var chart = anychart.quadrant(data);

	// configure scales
	chart.yScale().minimum(-100);
	chart.yScale().maximum(100);
	chart.xScale().minimum(-100);
	chart.xScale().maximum(100);

	// configure axes
	chart.xAxis(0, {ticks: true, labels: true});
	chart.xAxis(1, {ticks: true, labels: true});
	chart.yAxis(0, {ticks: true, labels: true});
	chart.yAxis(1, {ticks: true, labels: true});

	// set the chart title
	chart.title("Quadrant Chart: Axes");

	// set the container id
	chart.container("Quadrant");

	// initiate drawing the chart
	chart.draw();
});

function optionChanged(something) {
	buildchart(newdata)
}