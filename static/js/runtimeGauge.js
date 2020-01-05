// Create chart Runtime
function runtimeGauge(urlFilm, maxTime, genre) {
    // All parameters are from the quad.js file.
    // urlFilm: Flask url to access the json data of the movie selected
    // maxTime: Runtime of the longest movie in the selected genre
    // genre: SINGLE genre as defined from the quadrant chart selection

    // Clear the gauge chart of previous data
    document.getElementById("canvas1").innerHTML = "";

    // Use `d3.json` to fetch the sample data for the plots
    d3.json(urlFilm).then(data => {

        var runtime = data.Runtime;
        var title = data.Title;

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
        })
    })
};