// Create chart Runtime
function voteCountGauge(urlFilm, maxVotes, genre) {
    // Clear the gauge chart of previous data
    document.getElementById("canvas2").innerHTML = "";

    // Use `d3.json` to fetch the sample data for the plots
    d3.json(urlFilm).then(data => {

        var votechart = data.imdbVotes;
        var title = data.Title;

        var ctx3 = document.getElementById("canvas2").getContext('2d');
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
        })
    })
};