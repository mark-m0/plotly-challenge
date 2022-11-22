const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


d3.json(url).then((data) => {

    console.log("data", data);

    let names = data["names"];
    console.log("names", names);

    let metadata = data["metadata"];
    console.log("metadata", metadata);

    let samples = data["samples"];
    console.log("samples", samples);


    console.log("metadata[0]", metadata[0]);
    console.log("samples[0]", samples[0]);
    console.log('samples[0]["otu_ids"]', samples[0]["otu_ids"]);
    console.log('samples[0]["otu_labels"]', samples[0]["otu_labels"]);
    console.log('samples[0]["sample_values"]', samples[0]["sample_values"]);
    console.log('samples[0]["sample_values"] first 10?', samples[0]["sample_values"].slice(0,10));


    //Add each name element to the dropdown list
    names.forEach((name)=> {
        d3.select("#selDataset").append("option").text(name);
    })


    //init function will give us an initial landing page to work from
    function init() {
        let initialData = samples[0];
        let otuIds = initialData["otu_ids"];
        console.log(otuIds);
        let otuLabels = initialData["otu_labels"];
        console.log(otuLabels);
        let sampleValues = initialData["sample_values"];
        console.log(sampleValues);

        // slice out the top 10 values and then reverse the order for the bar chart
        let slicedOtuIds = otuIds.slice(0,10).reverse();
        console.log(slicedOtuIds);
        let slicedOtuLabels = otuLabels.slice(0,10).reverse();
        console.log(slicedOtuLabels);
        let slicedSampleValues = sampleValues.slice(0,10).reverse();
        console.log(slicedSampleValues);

        PrettyOtuIds = slicedOtuIds.map(OtuID => `OTU ${OtuID}`);
        console.log(PrettyOtuIds);

        //Trace1 for the barchart
        let trace1 = {
            x: slicedSampleValues,
            y: PrettyOtuIds,
            text: slicedOtuLabels,
            type: "bar",
            orientation: "h"
        };

        //Set Trace1 as data1 for the bar chart plot, putting it into a list format
        let data1 = [trace1];
        //Plot the bar chart
        Plotly.newPlot("bar", data1);


        //Trace2 for the bubble chart
        let trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                color: otuIds,
                size: sampleValues
            }
        };
        //Set Trace2 as data2 for the bubble chart plot, putting it into a list format
        let data2 = [trace2];
        //Plot the bubble chart
        Plotly.newPlot("bubble", data2);


        //Get metadata for the initial data
        let metadata0 = metadata[0];
        console.log(metadata0);

        //turn the metadata0 dictionary into arrays 
        let nmetadata0 = Object.entries(metadata0);
        console.log(nmetadata0);

        //Take the nmetadata0 list, pull out the keys and values and append them into paragraph elements
        //that will be added to the html code
        nmetadata0.forEach(([key, value]) => {
            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
        });
    };

    //Call the init function to generate the initial plots and landing page
    init();

    d3.selectAll("#selDataset").on("change", updatePage);

    function updatePage() {
        //select the dropdown menu, then take the new value in
        let inElement = d3.select("#selDataset");
        let nValue = inElement.property("value");

        //create nData to hold the information for the new value
        let nData = data["samples"].filter(sample => sample.id === nValue)[0];
        console.log("nData", nData);

        //create variables to hold specific data
        let nSampleValues = nData["sample_values"];
        let nOtuIds = nData["otu_ids"];
        let nOtuLabels = nData["otu_labels"];

        //slice for the top 10 datapoints
        let nSlicedOtuIds = nOtuIds.slice(0,10).reverse();
        let nSlicedOtuLabels = nOtuLabels.slice(0,10).reverse();
        let nSlicedSampleValues = nSampleValues.slice(0,10).reverse();

        //Change the bar chart by changing the input data
        Plotly.restyle("bar", "x", [nSlicedSampleValues]);
        Plotly.restyle("bar", "y", [nSlicedOtuIds.map(OtuID => `OTU ${OtuID}`)]);
        Plotly.restyle("bar", "text", [nSlicedOtuLabels]);

        //Change the bubble chart by changing the input data
        Plotly.restyle("bubble", "x", [nOtuIds]);
        Plotly.restyle("bubble", "y", [nSampleValues]);
        Plotly.restyle("bubble", "marker.size", [nSampleValues]);
        Plotly.restyle("bubble", "marker.color", [nOtuIds]);
        Plotly.restyle("bubble", "text", [nOtuLabels]);

        //Save the metadata for the respective nValue
        let nMetadata = metadata.filter(sample => sample.id == nValue)[0];
        console.log("nMetadata", nMetadata);

        //clear the metadata box
        d3.select("#sample-metadata").html("");

        //Insert the nMetadata information into the metadata box
        nMetadata = Object.entries(nMetadata);
        nMetadata.forEach(([key, value]) => {
            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
        });

    };
















});