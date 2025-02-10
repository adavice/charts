document.getElementById("btnD").addEventListener("click", function () {
    toggleActiveMode("btnD");
});
document.getElementById("btnW").addEventListener("click", function () {
    toggleActiveMode("btnW");
});
document.getElementById("btnM").addEventListener("click", function () {
    toggleActiveMode("btnM");
});

// Toggle active class for Worldwide and All devices buttons
/*document.getElementById("btnWorldwide").addEventListener("click", function () {
    toggleActiveMode("btnWorldwide");
});
document.getElementById("btnAllDevices").addEventListener("click", function () {
    toggleActiveMode("btnAllDevices");
});*/

function toggleActiveMode(buttonId) {
    var buttons = document.querySelectorAll(".btn-custom-mode, .btn-custom");
    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });
    document.getElementById(buttonId).classList.add("active");
}