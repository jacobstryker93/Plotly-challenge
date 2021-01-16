var select = d3.select("#selDataset");

d3.json("samples.json").then((data) => {
    console.log(data);

    var names = data.names;

    names.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });
    var initSample = names[0];
    buildCharts(initSample);
    metadata(initSample);
});

function metadata(sample) {
    d3.json("sample.json").then((data) => {
        var metadata = data.metadata;
        var filtered = metadata.filter((item) => item.id == sample);
        console.log(filtered[0]);

        var list = d3.select("#sample-metadata");

        list.html("");

        list.append("li").text(filtered[0].id);
        list.append("li").text(filtered[0].ethnicity);
        list.append("li").text(filtered[0].gender);
        list.append("li").text(filtered[0].age);
        list.append("li").text(filtered[0].location);

    });
}

function chartBuilder(sample) {
    d3.json("sample.json").then((data) => {
        var samples = data.samples;
        var sample_id = samples.filter(item => item.id == sample);
        var result = sample_id[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var trace1 = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                mode: "markers",
                marker: {
                    color: 'blue',
                }
            }]
    })
};

        var hBarLayout = {
            title: "Top 10 Bacteria Found",
            font:{
                family: 'Arial'

            },
            margin: {t: 30, l: 150},
            xaxis: {
                title: "Sample Value",
            },
            yaxis: {
                title: "OTU ID",
            }
        };
        
        Plotly.newPlot("bar", trace1, barLayout);

        var trace2 = [
            {
            
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "YlGNBu"
            }
        }];