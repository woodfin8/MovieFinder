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

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        colors: otu_ids
      }
    };

    var bubbleData = [trace1];

    var layout = {
      height: 600
    };

    Plotly.plot("bubble", bubbleData, layout);

    // @TODO: Build a Pie Chart
    var trace = {
      values: sample_values.slice(0,10),
      labels: otu_ids.slice(0,10),
      mode: "markers",
      marker: {size:10},
      text: otu_labels.slice(0,10),
      type: "pie",
      textinfo: "label+percent",
      textposition: "outside",
      automargin: true
    };

    var pieData = [trace];

    var pieLayout = {
      height: 600,
      width: 800
    };
    
    Plotly.plot("pie", pieData, pieLayout);
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

  