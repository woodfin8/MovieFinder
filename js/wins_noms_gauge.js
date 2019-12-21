// Create chart Nominations vs wins
var ctx = document.getElementsByClassName("chartjs-gauge-3");
var chart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Wins", "Nominations"],
        datasets: [{
            label: "Gauge",
            data: [500, 360],
            backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)"
            ]
        }]
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        // title: {
        //     display: true,
        //     text: 'Wins vs. Nominations',
        //     fontSize: 40 
        // },

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
                    return 'Wins:' + value;
                }
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: true
        }
    }
});