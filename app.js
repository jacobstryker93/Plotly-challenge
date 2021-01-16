// @TODO: YOUR CODE HERE!
//(1)Need to have one set of things happen on the first page load (initialization) 
//(2)Certain things needed for user inputs on dropdown (re-render)
function optionChanged(id) {
  console.log(id);

  d3.json("samples.json").then(function (data) {
    var hChart = data.samples.filter(object => object.id == id);
    console.log(hChart);
    console.log(hChart[0].otu_ids);
    console.log(hChart[0]["otu_ids"]);
  })
  
}
function init() {
  d3.json("samples.json").then(function (data) {
    var dataSet = d3.select("#selDataset");


    var names = data.names;
    names.forEach((name) => {
      dataSet.append("option")
        .text(name)
        .attr("value", name);
    });
    console.log(data.names);

  });

}
function hBarChart() {

  var eyeColor = ["Brown", "Brown", "Brown", "Brown", "Brown",
    "Brown", "Brown", "Brown", "Green", "Green",
    "Green", "Green", "Green", "Blue", "Blue",
    "Blue", "Blue", "Blue", "Blue"];
  var eyeFlicker = [26.8, 27.9, 23.7, 25, 26.3, 24.8,
    25.7, 24.5, 26.4, 24.2, 28, 26.9,
    29.1, 25.7, 27.2, 29.9, 28.5, 29.4, 28.3];

  // Create the Trace
  var trace1 = {
    x: eyeColor,
    y: eyeFlicker,
    type: "bar"
  };

  // Create the data array for the plot
  var data = [trace1];

  // Define the plot layout
  var layout = {
    title: "Eye Color vs Flicker",
    xaxis: { title: "Eye Color" },
    yaxis: { title: "Flicker Frequency" }
  };

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar", data, layout);
}
init();
