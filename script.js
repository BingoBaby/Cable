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

function updateImage(shape) {
    var roundImage = document.getElementById("roundImage");
    var squareImage = document.getElementById("squareImage");

    if (shape === "round") {
        roundImage.classList.add("selected");
        squareImage.classList.remove("selected");
    } else if (shape === "square") {
        roundImage.classList.remove("selected");
        squareImage.classList.add("selected");
    }
}

function selectRadio(shape) {
    document.getElementById(shape).checked = true;
}

function selectRadio(shape) {
    document.getElementById(shape).checked = true;
}

function selectAccessory(accessoryId) {
    var accessoryInput = document.getElementById(accessoryId);
    accessoryInput.focus(); // Focus on the corresponding input field
    accessoryInput.select(); // Select the text in the input field

    // Remove 'selected' class from all images
    var accessoryImages = document.querySelectorAll('.accessory-image');
    accessoryImages.forEach(function(image) {
        image.classList.remove('selected');
    });

    // Add 'selected' class to the clicked image
    var clickedImage = document.querySelector('img[onclick="selectAccessory(\'' + accessoryId + '\')"]');
    clickedImage.classList.add('selected');
}


function updateTrayImage() {
    var trayType = document.getElementById("trayType").value;
    var trayImage = document.getElementById("trayImage");

    // Update image source based on selected option
    switch (trayType) {
        case "cableLadder":
            trayImage.src = "image/Cable Ladder/CLE_LeftReducer.png";
            break;
        case "cableTray":
            trayImage.src = "image/CTC/CTC_StraightReducer.png";
            break;
        case "meshTray":
            trayImage.src = "image/Mesh Tray/Mesh Tray.jpg";
            break;
        case "pvcCableTrunking":
            trayImage.src = "image/PVC Trunking/2.jpg";
            break;
        default:
            trayImage.src = ""; // Empty image source for default case
    }
}
function toggleTReducerOptions() {
    var tReducerYes = document.getElementById("tReducerYes");
    var tReducerOptions = document.getElementById("tReducerOptions");
    var tReducerImage = document.getElementById("tReducerImage");

    if (tReducerYes.checked) {
        tReducerOptions.style.display = "block"; // Show options
        tReducerImage.style.display = "inline-block"; // Show image
    } else {
        tReducerOptions.style.display = "none"; // Hide options
        tReducerImage.style.display = "none"; // Hide image
    }
}