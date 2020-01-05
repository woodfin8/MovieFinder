// Create chart Nominations vs wins
function winsNomsGauge(urlFilm) {
    // All parameters are from the quad.js file.
    // urlFilm: Flask url to access the json data of the movie selected

    // Clear the gauge chart of previous data
    document.getElementById("canvas3").innerHTML = "";

    // Use `d3.json` to fetch the sample data for the plots
    d3.json(urlFilm).then(data => {

        var title = data.Title;
        var winchart = data.Wins;
        var nomchart = data.Nominations;

        var ctx2 = document.getElementById("canvas3").getContext('2d');
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
        })
    })
};