// LUMÉRA - Simple JavaScript for ICT600
// Mobile navigation
var menuButton = document.getElementById("menuButton");
if (menuButton != null) {
    menuButton.addEventListener("click", function () {
        document.getElementById("navLinks").classList.toggle("open");
    });
}

// Fictional service prices
var servicePrices = {
    atlantis: 15000,
    mermaid: 10000,
    treasure: 12000,
    dragon: 20000
};
var serviceNames = {
    atlantis: "Atlantis Expedition",
    mermaid: "Mermaid Encounter",
    treasure: "Mystic Treasure Hunt",
    dragon: "Sea Dragon Safari"
};
var conditionPrices = { normal: 0, challenging: 700, extreme: 1500 };
var urgencyPrices = { standard: 0, priority: 300, express: 700 };

// Show an error below an invalid field
function showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add("input-error");
    document.getElementById(inputId).setAttribute("aria-invalid", "true");
    document.getElementById(errorId).textContent = message;
}

// Clear all form errors
function clearErrors() {
    var inputIds = ["customerName", "customerEmail", "service", "condition", "urgency"];
    var errorIds = ["nameError", "emailError", "serviceError", "conditionError", "urgencyError"];

    for (var i = 0; i < inputIds.length; i++) {
        document.getElementById(inputIds[i]).classList.remove("input-error");
        document.getElementById(inputIds[i]).removeAttribute("aria-invalid");
        document.getElementById(errorIds[i]).textContent = "";
    }
}

function calculateEstimate() {
    var name = document.getElementById("customerName").value.trim();
    var email = document.getElementById("customerEmail").value.trim();
    var service = document.getElementById("service").value;
    var condition = document.getElementById("condition").value;
    var urgency = document.getElementById("urgency").value;

    clearErrors();
    var isValid = true;

    if (name == "") {
        showError("customerName", "nameError", "Please enter your name.");
        isValid = false;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == "") {
        showError("customerEmail", "emailError", "Please enter your email address.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError("customerEmail", "emailError", "Please enter a valid email address.");
        isValid = false;
    }

    if (servicePrices[service] == undefined) {
        showError("service", "serviceError", "Please select an adventure.");
        isValid = false;
    }
    if (conditionPrices[condition] == undefined) {
        showError("condition", "conditionError", "Please select a condition.");
        isValid = false;
    }
    if (urgencyPrices[urgency] == undefined) {
        showError("urgency", "urgencyError", "Please select an urgency.");
        isValid = false;
    }

    if (isValid == false) {
        document.getElementById("result").hidden = true;
        document.getElementById("emptyResult").style.display = "block";
        return;
    }

    var basePrice = servicePrices[service];
    var conditionFee = conditionPrices[condition];
    var urgencyFee = urgencyPrices[urgency];
    var total = basePrice + conditionFee + urgencyFee;

    // Display all selected values and final price on the page
    document.getElementById("resultName").textContent = name;
    document.getElementById("resultEmail").textContent = email;
    document.getElementById("resultService").textContent = serviceNames[service];
    document.getElementById("resultCondition").textContent = condition;
    document.getElementById("resultUrgency").textContent = urgency;
    document.getElementById("resultBase").textContent = "RM " + basePrice.toFixed(2);
    document.getElementById("resultConditionFee").textContent = "RM " + conditionFee.toFixed(2);
    document.getElementById("resultUrgencyFee").textContent = "RM " + urgencyFee.toFixed(2);
    document.getElementById("resultTotal").textContent = "RM " + total.toFixed(2);
    document.getElementById("emptyResult").style.display = "none";
    document.getElementById("result").hidden = false;
    alert("Calculation complete! Your estimate is displayed on this page.");
}

var estimateForm = document.getElementById("estimateForm");
if (estimateForm != null) {
    // Preselect a service if user clicked it on Experiences page
    var params = new URLSearchParams(window.location.search);
    var selectedService = params.get("service");
    if (selectedService != null && servicePrices[selectedService] != undefined) {
        document.getElementById("service").value = selectedService;
    }
    estimateForm.addEventListener("submit", function (event) {
        event.preventDefault();
        calculateEstimate();
    });
    estimateForm.addEventListener("reset", function () {
        document.getElementById("result").hidden = true;
        document.getElementById("emptyResult").style.display = "block";
        clearErrors();
    });

    // Remove an error when the customer edits that field
    var inputIds = ["customerName", "customerEmail", "service", "condition", "urgency"];
    var errorIds = ["nameError", "emailError", "serviceError", "conditionError", "urgencyError"];

    for (var i = 0; i < inputIds.length; i++) {
        (function (inputId, errorId) {
            var field = document.getElementById(inputId);
            function removeError() {
                field.classList.remove("input-error");
                field.removeAttribute("aria-invalid");
                document.getElementById(errorId).textContent = "";
            }
            field.addEventListener("input", removeError);
            field.addEventListener("change", removeError);
        })(inputIds[i], errorIds[i]);
    }
}
