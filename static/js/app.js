// Use the D3 library to read in `samples.json`. 
// create 4 functions- dropDownID, megaData, plots, optionChanged


function megaData(sampleID){
    d3.json("samples.json").then((data) => {
        var samplesKey = data.samples;
        var filteredData = samplesKey.filter(d =>d.id == sampleID)[0];
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");
        Object.entries(filteredData).forEach((key) => {demoInfo.append("h5").text});
    });

};

function plots(sampleID){
    d3.json("samples.json").then((data) => {
        console.log(data)

        var samplesKey = data.samples;
        var filteredData = samplesKey.filter(d =>d.id == sampleID)[0];
        var otuID = filteredData.otu_ids.slice(0, 10).reverse() ;
        var otuLabel= filteredData.otu_labels.slice(0, 10);
        var sampleValues = filteredData.sample_values.slice(0, 10).reverse();

        // Create bar chart
        var trace1 = {
            x: sampleValues,
            y: otuID,
            text: labels,
            type:"bar",
            orientation: "h",
            };
        // Create the data array for the plot
        var data1 = [trace1];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };
                    
        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data1, layout);

        // Create bubble chart
        var trace2 = {
            x: otuID,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuID
            },
            text: otuLabel

        };

        // set the layout for the bubble plot
        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        // create the data variable 
        var data2 = [trace2];

        // create the bubble plot
        Plotly.newPlot("bubble", data2, layout); 
    }
    )};

function dropDownID(){
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {
        console.log(data)
    
            // get the id data to the dropdown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
    
            // call the functions to display the data and the plots to the page
        plots(data.names[0]);
        megaData(data.names[0]);
    });
};

function optionChanged(sampleID){
    plots(sampleID);
    megaData(sampleID);
};


dropDownID();

