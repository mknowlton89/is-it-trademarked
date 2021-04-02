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

                queryInputString = queryInput.replace(/%20/g, " ");

                const tmIsAvailH4 = $('<h4>').text("Congrats! No one else currently owns a trademark on " + queryInputString + "!");
                $("#trademark-results").append(tmIsAvailH4);

                const getStartedBtn = $('<button>').text("Start Your Application");
                getStartedBtn.attr("onclick", "location.href='https://www.uspto.gov/trademarks'");
                // getStartedBtn.addClass("button");
                $("#trademark-results").append(getStartedBtn);


                isDomainAvailable();
            } else if (data[0].available === "no") {
                const tmIsNotAvailH4 = $('<h4>').text("Sorry! This is already trademarked.");
                $("#trademark-results").append(tmIsAvailH4);

            }
        });


}

function lookupWhoIs() {
    // alert("lookupWhoIs was called");
    queryInputString = queryInput.replace(/%20/g, "");

    https://website-contacts.whoisxmlapi.com/api/v1?apiKey=at_20p8HWePpxdOdgfSS2c42tVKGNMRB&domainName=cnn.com

    var requestUrl = 'https://website-contacts.whoisxmlapi.com/api/v1?apiKey=at_20p8HWePpxdOdgfSS2c42tVKGNMRB&domainName=' + queryInputString + '.com';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            const ownerEmail = data.emails[0].email;

            const ownerPhoneNumber = data.phones[0].phoneNumber

            if (ownerPhoneNumber || ownerEmailEl) {
                const ownerInfoEl = $('<h4>').text("Here is the contact info we have of the current domain owner.");
                $("#whois-results").append(ownerInfoEl);
            }

            if (ownerEmail) {

                const ownerEmailEl = $('<p>').text(ownerEmail);
                $("#whois-results").append(ownerEmailEl);
            }

            if (ownerPhoneNumber) {
                const ownerPhoneNumberEl = $('<p>').text(ownerPhoneNumber);
                $("#whois-results").append(ownerPhoneNumberEl);
            }

        });
}

function isDomainAvailable() {

    queryInputString = queryInput.replace(/%20/g, "");

    var requestUrl = 'https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_20p8HWePpxdOdgfSS2c42tVKGNMRB&domainName=' + queryInputString + '.com&credits=DA';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            console.log(data.DomainInfo.domainAvailability);

            if (data.DomainInfo.domainAvailability === "UNAVAILABLE") {

                const domainIsAvailH4 = $('<h4>').text("Sorry! This domain is already taken.");
                $("#domain-results").append(domainIsAvailH4);

                lookupWhoIs();

            } else if (data.DomainInfo.domainAvailability === "AVAILABLE") {

                const domainIsAvailH4 = $('<h4>').text("Congrats! This domain is currently available!");
                $("#domain-results").append(domainIsAvailH4);

                queryInputForDomain = queryInput.replace(/%20/g, "+");

                getDomainUrl = "https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=" + queryInputForDomain;

                const getDomainBtn = $('<button>').text("Purchase the Domain");
                getDomainBtn.attr("onclick", "location.href='" + getDomainUrl + "'");

                $("#domain-results").append(getDomainBtn);
            }
        });


    // if (data.DomainInfo.domainAvailability === ""
}

// Event Listeners



// Function Calls
init();