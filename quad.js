//QUADRANT CODES

//<!--script src="https://cdn.anychart.com/releases/8.7.0/js/anychart-core.min.js"></script-->
//<script src="https://cdn.anychart.com/releases/8.7.0/js/anychart-scatter.min.js"></script-->
<script src="https://cdn.anychart.com/releases/8.7.0/js/anychart-base.min.js"></script>


// create data
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
  chart = anychart.quadrant(data);

   // set the chart title
   chart.title("Quadrant Chart: Quarters (Titles)");
  
  // set the container id
  chart.container("plot");
  
  // initiate drawing the chart
  chart.draw();

  // create the first series (marker)
var series1 = chart.marker(data_1);

// configure the visual settings of the first series
series1.normal().fill("black", 0.3);
series1.hovered().fill("black", 0.1);
series1.selected().fill("black", 0.5);
series1.normal().stroke("black", 1);
series1.hovered().stroke("black", 2);
series1.selected().stroke("black", 4);

// create the second series (line)
var series2 = chart.line(data_2);

// configure the visual settings of the second series
series2.normal().stroke("#00cc99", 3, "10 5", "round");

// create the third series (bubble)
var series3 = chart.bubble(data_3);

// configure the visual settings of the third series
series3.normal().fill("#0066cc", 0.3);
series3.hovered().fill("#0066cc", 0.1);
series3.selected().fill("#0066cc", 0.5);
series3.normal().stroke("#0066cc");
series3.hovered().stroke("#0066cc", 2);
series3.selected().stroke("#0066cc", 4);

 // configure quarters
 chart.quarters(
    {
        rightTop: {
            title: {
                text: "Important but Not Urgent",
                fontSize: "16",
                fontWeight: "bold"
            }
        },
        rightBottom: {
            title: {
                text: "Not Important and Not Urgent",
                fontSize: "16",
                fontWeight: "bold"
            }
        },
        leftTop: {
            title: {
                text: "Important and Urgent",
                fontSize: "16",
                fontWeight: "bold"
            }
        },
        leftBottom: {
            title: {
                text: "Urgent But Not Important",
                fontSize: "16",
                fontWeight: "bold"
            }
        },
    }
    );


// configure the crossing
chart.crossing().stroke("gray", 3, "7 3", "round");

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

// create the first label on the left-bottom quarter
var labelLBottom1 = chart.quarters().leftBottom().label(0);
labelLBottom1.text("3");
labelLBottom1.fontColor("gray");
labelLBottom1.fontSize(16);
labelLBottom1.fontWeight("bold");
labelLBottom1.position("rightTop");
labelLBottom1.offsetX(-20);
labelLBottom1.offsetY(20);

// create the second label on the left-bottom quarter
var labelLBottom2 = chart.quarters().leftBottom().label(1);
labelLBottom2.useHtml(true);
labelLBottom2.text("Important / Not Important &#8594;");
labelLBottom2.position("leftBottom");
labelLBottom2.offsetX(-20);
labelLBottom2.offsetY(-100);
labelLBottom2.rotation(-90);

