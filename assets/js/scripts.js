// DOM Variables
const submitBtn = $("#submit-btn");
let queryInput = $('#query-input');
const queryForm = $('#query-form');

// JS variables
let redirectUrl = './results.html';

// Function Definitions
function redirectUser(event) {
    event.preventDefault();

    redirectUrl = redirectUrl + "?" + queryInput.val();

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
submitBtn.on("click", redirectUser);


// Function Calls