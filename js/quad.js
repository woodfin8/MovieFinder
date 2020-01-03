//QUADRANT CODES
//<!--script src="https://cdn.anychart.com/releases/8.7.0/js/anychart-core.min.js"></script-->
//<script src="https://cdn.anychart.com/releases/8.7.0/js/anychart-scatter.min.js"></script-->
//<script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-base.min.js" type="text/javascript"></script-->
//grab data for quad chart via flask

function buildQuad(genre) {

    //clear pre-existing chart
    document.getElementById("Quadrant").innerHTML = "";

    //define url path for data
    var urlgenre = `/movies/${genre}`;

    //grab data with d3.json then use map function to get IMDB and RT Scores
    d3.json(urlgenre).then(d => {
        var IMDB = d.map(a => a.IMDB)
        var RT = d.map(a => a.Rotten_Tomatoes)
        var Title = d.map(a => a.Title)


        //combine the two arrays into an array of arrays
        var results = RT.map((x, i) =>
            [x, IMDB[i]]);
        console.log(results, Title);

        var data = RT.map((x, i) =>
            [Title[i], x, IMDB[i]]);

        console.log(data);

        var dataSet = anychart.data.set(data);

        var mapping = dataSet.mapAs({ title: 0, x: 1, value: 2 });

        console.log(mapping)


        //create quadrant chart with any chart js library
        anychart.onDocumentReady(function () {

            var chart = anychart.quadrant(mapping);

            // set tooltip text template
            var tooltip = chart.getSeries(0).tooltip();
            tooltip.title().text("Movie");
            tooltip.format("{%title} \n Rotten Tomatoes {%x} \n IMDB {%value} ");

;

            // configure scales
            chart.yScale().minimum(0);
            chart.yScale().maximum(10);
            chart.xScale().minimum(0);
            chart.xScale().maximum(100);

            // configure axes
            chart.xAxis(0, { ticks: true, labels: true });
            chart.xAxis(1, { ticks: true, labels: true });
            chart.yAxis(0, { ticks: true, labels: true });
            chart.yAxis(1, { ticks: true, labels: true });

            // set the chart title
            chart.title(`${genre} Movies`);

            // set the container id
            chart.container("Quadrant");

            // initiate drawing the chart
            chart.draw();
        })
    })
}

function init() {
    const firstGenre = "Action"
    buildQuad(firstGenre)
}

function optionChanged(newGenre) {
    console.log(newGenre);
    // Fetch new data each time a new sample is selected
    buildQuad(newGenre);
}

// Initialize the dashboard
init();