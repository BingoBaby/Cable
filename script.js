document.addEventListener("DOMContentLoaded", function() {
    var installationSelect = document.getElementById("installation");
    var airDropdown = document.getElementById("air-dropdown");
    var directInGroundDropdown = document.getElementById("direct-in-ground-dropdown");
    var undergroundDuctDropdown = document.getElementById("underground-duct-dropdown");

    installationSelect.addEventListener("change", function() {
        var selectedValue = installationSelect.value;

        // Hide all dropdowns
        airDropdown.style.display = "none";
        directInGroundDropdown.style.display = "none";
        undergroundDuctDropdown.style.display = "none";

        // Show the selected dropdown
        if (selectedValue === "air") {
            airDropdown.style.display = "block";
        } else if (selectedValue === "direct-in-ground") {
            directInGroundDropdown.style.display = "block";
        } else if (selectedValue === "underground-duct") {
            undergroundDuctDropdown.style.display = "block";
        }
    });
});
