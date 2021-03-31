// DOM Variables
const documentLocation = document.location.search;
const queryInput = documentLocation.split("?")[1];
let trademarkUrl = "https://uspto-trademark.p.rapidapi.com/v1/trademarkAvailable/" + queryInput;

console.log(queryInput);

// JS variables

// Function Definitions
function init() {
    isItTrademarked();
}

function isItTrademarked() {
    // isDomainAvailable();

    fetch("https://uspto-trademark.p.rapidapi.com/v1/trademarkAvailable/" + queryInput, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "a28485e035mshea53364c530bf58p1f6a19jsn9a5ad2a4ac17",
            "x-rapidapi-host": "uspto-trademark.p.rapidapi.com"
        }
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            if (data[0].available === "yes") {
                isDomainAvailable();
            }
        });


}

function isDomainAvailable() {
    var requestUrl = 'https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_20p8HWePpxdOdgfSS2c42tVKGNMRB&domainName=' + queryInput + '.com&credits=DA';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

// Event Listeners



// Function Calls
init();