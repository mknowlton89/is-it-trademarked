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

    queryInput.val('');

    document.location.assign(redirectUrl);

}


// Event Listeners
submitBtn.on("click", redirectUser);


// Function Calls