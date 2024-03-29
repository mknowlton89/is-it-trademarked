// DOM Variables
const documentLocation = document.location.search;
const queryInput = documentLocation.split("?")[1];


// JS variables
let trademarkUrl = "https://uspto-trademark.p.rapidapi.com/v1/trademarkAvailable/" + queryInput;

// Function Definitions
function init() {

    // Get local storage
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    console.log(searchHistory);

    // Create a div to hold the local storage
    const searchHistoryDiv = $("<div>");

    // Create a headline for the DIV
    const searchHistoryH4 = $('<h4>').text("Search History");

    // Create an un-ordered list for the search history
    const searchHistoryList = $('<ul>');
    searchHistoryList.attr("id", "searchHistory");

    // Append everything to the page
    $('#left-container').append(searchHistoryDiv);
    searchHistoryDiv.append(searchHistoryH4);
    searchHistoryDiv.append(searchHistoryList);

    // Create a for-loop to build out the full search history
    for (let i = 0; i < searchHistory.length; i++) {
        // Get the item in the array, create a list element, and then give it text.
        let searchHistoryListItem = $('<li>');
        let searchHistoryListLink = $('<a>').text(searchHistory[i]);

        // searchHistoryListItem.attr("id", i);
        // searchHistoryListItem.attr("value", searchHistory[i]);
        searchHistoryListLink.attr("href", "./results.html?" + searchHistory[i]);

        // Append the list item to the list.
        searchHistoryList.append(searchHistoryListItem);
        searchHistoryListItem.append(searchHistoryListLink);
    }

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
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data);

            if ($('#trademark-results').hasClass('hidden')) {
                $('#trademark-results').toggleClass('hidden');
            }

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

    var requestUrl = 'https://website-contacts.whoisxmlapi.com/api/v1?apiKey=at_20p8HWePpxdOdgfSS2c42tVKGNMRB&domainName=' + queryInputString + '.com';

    if ($('#whois-results').hasClass('hidden')) {
        $('#whois-results').toggleClass('hidden');
    };

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

    var requestUrl = 'https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_dvdglXk3z5EnThTPZGjM59oma9dZF&domainName=' + queryInputString + '.com&credits=DA';

    if ($('#domain-results').hasClass('hidden')) {
        $('#domain-results').toggleClass('hidden');
    };

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

function resultsSearch(event) {

    event.preventDefault();

    let queryInput = $('#query-input');

    redirectUrl = "./results.html" + "?" + queryInput.val();

    // Pull local storage use JSON.parse
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    console.log(searchHistory);

    // If it's undefined, set up empty array
    if (searchHistory === null) {
        searchHistory = [];
    }

    console.log(searchHistory);

    // Push into it
    searchHistory.push(queryInput.val());

    console.log(searchHistory);

    // Set it to local storage (via stringify)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    document.location.assign(redirectUrl);

}

// Event Listeners
$('#submit-btn').on("click", resultsSearch);

// Function Calls
init();