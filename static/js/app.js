function buildCharts(selectedPatientID) {
    d3.json("samples.json").then(data => {
        let patients = data.samples;
        // console.log(patients)
        var patientdata = patients.filter(patient => patient.id == selectedPatientID)
        // console.log(patientdata)
        var testresult = patientdata[0];
        // console.log(testresult)
        var testID = testresult.otu_ids;
        // console.log(testID)
        var testlabels = testresult.otu_labels;
        // console.log(testlabels)
        var testvalues = testresult.sample_values;
        // console.log(testvalues)


        // set up Plotly

        var trace1 = {
            x: testvalues.slice(0, 10).reverse(),
            y: testID.slice(0, 10).reverse(),
            text: testlabels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: "h"
        };

        var data = [trace1];

        var layout = {
            title: 'Top Ten Bacteria Cultures Found'
        };

        Plotly.newPlot('barDiv', data, layout);

    })
};

function populateDemographicInfo(selectedPatientID) {
    var demographicInfoBox = d3.select("#sample-metadata");
    d3.json("samples.json").then(data => {
        console.log(data)

        
    })
}

function optionChanged(selectedPatientID) {
    console.log(selectedPatientID);
    buildCharts(selectedPatientID);
    populateDemographicInfo(selectedPatientID);
}

function populateDropdown() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
    })
}

function buildWebsiteOnStartup() {
    populateDropdown();
    d3.json("samples.json").then(data => {
        buildCharts(data.names[0]);
        populateDemographicInfo(data.names[0]);
    })
};

buildWebsiteOnStartup();