function buildQuad(genre) {

    //clear pre-existing chart
    document.getElementById("Quadrant").innerHTML = "";

    //define url path for data
    var urlgenre = `/movies/${genre}`;

    //grab data with d3.json then use map function to get IMDB and RT Scores
    d3.json(urlgenre).then(d => {
        var IMDB = d.map(a => a.IMDB);
        var RT = d.map(a => a.Rotten_Tomatoes);
        var Title = d.map(a => a.Title);
        var Time = d.map(a => a.Runtime);
        var Votes = d.map(a => a.imdbVotes);
        var maxTime = (Math.max(...Time));
        var maxVotes = (Math.max(...Votes));
        console.log(`Max Time ${maxTime} \n Max Votes ${maxVotes}`);

        //combine three arrays into an array of arrays for AnyChart

        var data = RT.map((x, i) =>
            [Title[i], x, IMDB[i]]);

        var dataSet = anychart.data.set(data);

        var mapping = dataSet.mapAs({ title: 0, x: 1, value: 2 });

        //create quadrant chart with any chart js library
        anychart.onDocumentReady(function () {

            var chart = anychart.quadrant(mapping);

            // set tooltip text template
            var tooltip = chart.getSeries(0).tooltip();
            tooltip.title().text("Movie");
            tooltip.format("{%title} \n Rotten Tomatoes {%x} \n IMDB {%value} ");

            // configure scales
            chart.yScale().minimum(2);
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

            // configure quarters
            chart.quarters(
                {
                    rightTop: {
                        title: {
                            text: "The Greatest Hits",
                            fontColor: "#fa8072",
                            fontSize: "20",
                            fontWeight: "bold"
                        }
                    },
                    rightBottom: {
                        title: {
                            fontColor: "#fa8072",
                            text: "Critics' Choice",
                            fontSize: "20",
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
                            text: "Fan Favorites",
                            fontColor: "#fa8072",
                            fontSize: "20",
                            fontWeight: "bold"
                        }
                    },
                    leftBottom: {
                        title: {
                            fontColor: "#fa8072",
                            text: "Total Turkeys",
                            fontSize: "20",
                            fontWeight: "bold"
                        }
                    },
                }
            );

            //add axis labels

            var labelLBottom1 = chart.quarters().leftBottom().label(1);
            labelLBottom1.useHtml(true);
            labelLBottom1.text("IMDB Rating &#8594;");
            labelLBottom1.position("left-top");
            labelLBottom1.fontSize(20);
            labelLBottom1.offsetX(-20);
            labelLBottom1.offsetY(-110);
            labelLBottom1.rotation(-90);

            var labelLBottom2 = chart.quarters().leftBottom().label(3);
            labelLBottom2.useHtml(true);
            labelLBottom2.text("Rotten Tomatoes Critic Score &#8594;");
            labelLBottom2.position("left-bottom");
            labelLBottom1.fontSize(16)
            labelLBottom2.offsetX(80);
            labelLBottom2.offsetY(30);



            // initiate drawing the chart
            chart.draw();

            // "Listens" for data point clicks on the quadrant chart and adds the appropriate information for the selected movie
            chart.listen("pointClick", function (e) {
                var title = e.point.get('title');
                // console.log(title);

                var urlFilm = `/selection/${title}`;
                // console.log(urlfilm);

                // Adds Selected Movie Information to the Bottom of the index Webpage
                movieDescription(urlFilm);

                // Adds a Runtime Gauge
                runtimeGauge(urlFilm, maxTime, genre);

                // Add a Vote Count Gauge
                voteCountGauge(urlFilm, maxVotes, genre);

                // Adds a Wins vs. Noms Gauge
                winsNomsGauge(urlFilm);

                return urlFilm, genre, maxTime, maxVotes; 
            })
        })
    })
};

function init() { 
    // initializes the webpage with the Action Movies Quadrant Chart and information pertaining to "The Dark Knight"
    const initGenre = "Action";
    buildQuad(initGenre);

    const initMovie = `/selection/The Dark Knight`;
    const initTime = 187;
    const initMaxVotes = 2141768; 

    runtimeGauge(initMovie, initTime, initGenre);
    voteCountGauge(initMovie, initMaxVotes, initGenre);
    winsNomsGauge(initMovie);
    // movieDescription(initMovie);
};

function optionChanged(newGenre) {
    // console.log(newGenre);
    // Fetch new data each time a new sample is selected
    buildQuad(newGenre);
    // NOTE: Functions for adding selected movie data based on data point clicks on the Quadrant Chart are in the buildQuad() function
    
};

// Initialize the dashboard
init();
