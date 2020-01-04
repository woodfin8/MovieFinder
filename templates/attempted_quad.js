function buildData(genre) {
  var url = `/movies/${genre}`;
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then((data)=> {
  
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select(".btn btn-outline-success my-2 my-sm-0");
    
  // Use `.html("") to clear any existing metadata
    panel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      var cell = panel.append("p");
      cell.text(`${key}:${value}`);
    });
  });
}


function buildCharts(sample) {
   // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;

  d3.json(url).then((data) => {


    var sample_values = data.sample_values;
    var otu_ids = data.otu_ids;
    var otu_labels = data.otu_labels;

    // @TODO: Build a Bubble Chart using the sample data
    function buildchart(data1){
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
        chart.title("Quadrant Chart");
    
        // set the container id
        chart.container("Quadrant");
    
        // initiate drawing the chart
        chart.draw();
    });
    
    function optionChanged(something) {
        buildchart(newdata)
    }
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

  