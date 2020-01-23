//QUADRANT CODES
//<!--script src="https://cdn.anychart.com/releases/8.7.0/js/anychart-core.min.js"></script-->
//<script src="https://cdn.anychart.com/releases/8.7.0/js/anychart-scatter.min.js"></script-->
//<script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-base.min.js" type="text/javascript"></script-->

function buildchart(movie_data){
}

//id = searchbtn;

var selector = d3.select("#searchbtn");

function movieresults(movie_data){

}

// create data
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


		// set the chart title
	chart.title("Quadrant Chart ");

	// set the container id
	chart.container("Quadrant");

// configure quarters
chart.quarters(
	{
		rightTop: {
			title: {
				text: "Universally Loved",
				fontColor: "#fa8072",
				fontSize: "12",
				fontWeight: "bold"
			}
		},
		rightBottom: {
			title: {
				fontColor: "#72fa80",
				text: "Critics Rating",
				fontSize: "12",
				fontWeight: "bold"
			}
		},
	}
);

// configure quarters
chart.quarters(
	{
		leftTop: {
			title: {
				text: "Fan Favorite",
				fontColor: "#fa8072",
				fontSize: "12",
				fontWeight: "bold"
			}
		},
		leftBottom: {
			title: {
				fontColor: "#72fa80",
				text: "Universally Disliked",
				fontSize: "12",
				fontWeight: "bold"
			}
		},
	}
);

// configure scales
chart.yScale().minimum(-100);
chart.yScale().maximum(100);
chart.xScale().minimum(-100);
chart.xScale().maximum(100);

	

// initiate drawing the chart
	chart.draw();
});

function optionChanged(movie_data) {
	buildchart(newdata)
}

