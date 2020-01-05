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
        var Time = d.map(a => a.Runtime)
        var Votes = d.map(a => a.imdbVotes)
        var maxTime = (Math.max(...Time))
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
            labelLBottom1.position("left-bottom");
            labelLBottom1.fontSize(16)
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


            chart.listen("pointClick", function (e) {
                var title = e.point.get('title');
                // console.log(title);

                var urlFilm = `/selection/${title}`;
                // console.log(urlfilm);

                // Adds Selected Movie Information to the Bottom of the index Webpage
                descriptionBuilder(urlFilm);

                // Adds a Runtime Gauge
                runtimeGauge(urlFilm, maxTime, genre);

                // Add a Vote Count Gauge
                voteCountGauge(urlFilm, maxVotes, genre);

                // Adds a Wins vs. Noms Gauge
                winsNomsGauge(urlFilm);

                // document.getElementById("canvas1").innerHTML = "";
                document.getElementById("canvas2").innerHTML = "";
                document.getElementById("canvas3").innerHTML = "";

                return urlFilm;

                d3.json(urlFilm).then(data => {

                    var runtime = data.Runtime;
                    var winchart = data.Wins;
                    var nomchart = data.Nominations;
                    var votechart = data.imdbVotes;

                    var ctx = document.getElementById("canvas1").getContext('2d');
                    var chart = new Chart(ctx, {
                        type: "doughnut",
                        data: {
                            labels: ["Runtime (mins)", "Longest Movie - Runtime (mins)"],
                            datasets: [{
                                label: "Gauge",
                                data: [runtime, (maxTime - runtime)],
                                backgroundColor: [
                                    "rgb(255, 99, 132)",
                                    "rgb(54, 162, 235)"
                                ]
                            }]
                        },
                        options: {

                            title: {
                                display: true,
                                text: `"${title}" Runtime vs Longest ${genre} Movie of ${maxTime} Mins`,
                                fontSize: 20,

                            },
                            responsive: true,
                            legend: {
                                position: 'top',
                            },

                            circumference: Math.PI,
                            rotation: Math.PI,
                            cutoutPercentage: 80, // precent
                            plugins: {
                                datalabels: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    borderColor: '#ffffff',
                                    color: function (context) {
                                        return context.dataset.backgroundColor;
                                    },
                                    font: function (context) {
                                        var w = context.chart.width;
                                        return {
                                            size: w < 512 ? 18 : 20
                                        }
                                    },
                                    align: 'start',
                                    anchor: 'start',
                                    offset: 10,
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    formatter: function (value, context) {
                                        var i = context.dataIndex;
                                        var len = context.dataset.data.length - 1;
                                        if (i == len) {
                                            return null;
                                        }
                                        return value + ' minutes';
                                    }
                                }
                            },
                            legend: {
                                display: false
                            },
                            tooltips: {
                                enabled: false
                            }
                        }
                    });
                    var ctx2 = document.getElementById("canvas2").getContext('2d');
                    var chart2 = new Chart(ctx2, {
                        type: "doughnut",
                        data: {
                            labels: ["Awards Won ", "Most Awards - Awards Won"],
                            datasets: [{
                                label: "Gauge",
                                data: [winchart, (1 + nomchart - winchart)],
                                backgroundColor: [
                                    "rgb(255, 99, 132)",
                                    "rgb(54, 162, 235)"
                                ]
                            }]
                        },
                        options: {

                            title: {
                                display: true,
                                text: `"${title}" Won ${winchart} Awards Out of ${nomchart} Nominations`,
                                fontSize: 20,

                            },
                            responsive: true,
                            legend: {
                                position: 'top',
                            },

                            circumference: Math.PI,
                            rotation: Math.PI,
                            cutoutPercentage: 80, // precent
                            plugins: {
                                datalabels: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    borderColor: '#ffffff',
                                    color: function (context) {
                                        return context.dataset.backgroundColor;
                                    },
                                    font: function (context) {
                                        var w = context.chart.width;
                                        return {
                                            size: w < 512 ? 18 : 20
                                        }
                                    },
                                    align: 'start',
                                    anchor: 'start',
                                    offset: 10,
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    formatter: function (value, context) {
                                        var i = context.dataIndex;
                                        var len = context.dataset.data.length - 1;
                                        if (i == len) {
                                            return null;
                                        }
                                        return value + ' Awards Won';
                                    }
                                }
                            },
                            legend: {
                                display: false
                            },
                            tooltips: {
                                enabled: false
                            }
                        }
                    });
                    var ctx3 = document.getElementById("canvas3").getContext('2d');
                    var chart3 = new Chart(ctx3, {
                        type: "doughnut",
                        data: {
                            labels: ["IMDB Votes ", "Most Votes - Votes"],
                            datasets: [{
                                label: "Gauge",
                                data: [votechart, (maxVotes - votechart)],
                                backgroundColor: [
                                    "rgb(255, 99, 132)",
                                    "rgb(54, 162, 235)"
                                ]
                            }]
                        },
                        options: {

                            title: {
                                display: true,
                                text: `"${title}" Votes vs Most Ranked ${genre} Movie with ${maxVotes} Votes`,
                                fontSize: 20,

                            },
                            responsive: true,
                            legend: {
                                position: 'top',
                            },

                            circumference: Math.PI,
                            rotation: Math.PI,
                            cutoutPercentage: 80, // precent
                            plugins: {
                                datalabels: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    borderColor: '#ffffff',
                                    color: function (context) {
                                        return context.dataset.backgroundColor;
                                    },
                                    font: function (context) {
                                        var w = context.chart.width;
                                        return {
                                            size: w < 512 ? 18 : 20
                                        }
                                    },
                                    align: 'start',
                                    anchor: 'start',
                                    offset: 10,
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    formatter: function (value, context) {
                                        var i = context.dataIndex;
                                        var len = context.dataset.data.length - 1;
                                        if (i == len) {
                                            return null;
                                        }
                                        return value + ' IMDB Votes';
                                    }
                                }
                            },
                            legend: {
                                display: false
                            },
                            tooltips: {
                                enabled: false
                            }
                        }
                    });
                })
                
            })


        })
    })
}

function init() { 
    const firstGenre = "Action"
    buildQuad(firstGenre)
};

function optionChanged(newGenre) {
    console.log(newGenre);
    // Fetch new data each time a new sample is selected
    buildQuad(newGenre);
};

// Initialize the dashboard
init();
