document.addEventListener("DOMContentLoaded", function() {
    var coresSelect = document.getElementById("cores");
    var installationSelect = document.getElementById("installation");

    var airDropdown = document.getElementById("air-dropdown");
    var directInGroundDropdown = document.getElementById("direct-in-ground-dropdown");
    var undergroundDuctDropdown = document.getElementById("underground-duct-dropdown");

    var airOptions = document.getElementById("air-options");
    var directInGroundOptions = document.getElementById("direct-in-ground-options");
    var undergroundDuctOptions = document.getElementById("underground-duct-options");

    var imageContainer = document.getElementById("image-container");

    var options = {
        multi: {
            air: {
                options: ["2 loaded core", "3/3.5/4 loaded core"],
                images: ["static/image/Method/Air/2 loaded core.png", "static/image/Method/Air/3_4 loaded core.png"]
            },
            "direct-in-ground": {
                options: ["2 core cable(1 phase)", "3,3.5 or 4 core cable"],
                images: ["static/image/Method/Direct in Ground/2 cables spaced(1 phase).png", "static/image/Method/Direct in Ground/3 or 4 core cable.png"]
            },
            "underground-duct": {
                options: ["2 core cable", "3,3.5 or 4 core cable"],
                images: ["static/image/Method/Underground duct/2 core cable.png", "static/image/Method/Underground duct/3 or 4 core cable.png"]
            }
        },
        single: {
            air: {
                options: ["2-single core touching", "3-single core touching", "3-single core trefoil", "3-single core spaced horizontal", "3-single core spaced vertical"],
                images: ["static/image/Method/Air/2-single core touching.png", "static/image/Method/Air/3-single core touching.png", "static/image/Method/Air/3-single core trefoil.png", "static/image/Method/Air/3-single core spaced horizontal.png", "static/image/Method/Air/3-single core spaced vertical.png"]
            },
            "direct-in-ground": {
                options: ["2 cables spaced(1 phase)", "3 cables trefoil touching(3 phase)"],
                images: ["static/image/Method/Direct in Ground/2 cables spaced(1 phase).png", "static/image/Method/Direct in Ground/3 cables trefoil touching(3 phase).png"]
            },
            "underground-duct": {
                options: ["2 cables-ducts touching", "3 cables-ducts touching trefoil"],
                images: ["static/image/Method/Underground duct/2 cables-ducts touching.png", "static/image/Method/Underground duct/3 cables-ducts touching trefoil.png"]
            }
        }
    };

    function updateOptions() {
        var coresValue = coresSelect.value;
        var installationValue = installationSelect.value;

        // Clear previous options
        airOptions.innerHTML = "";
        directInGroundOptions.innerHTML = "";
        undergroundDuctOptions.innerHTML = "";

        // Clear previous images
        imageContainer.innerHTML = "";

        if (coresValue && installationValue) {
            var selectedOptions = options[coresValue][installationValue].options;
            var selectedImages = options[coresValue][installationValue].images;

            selectedOptions.forEach(function(option, index) {
                var opt = document.createElement("option");
                opt.value = option.toLowerCase().replace(/\s+/g, '-');
                opt.text = option;

                if (installationValue === "air") {
                    airOptions.appendChild(opt);
                } else if (installationValue === "direct-in-ground") {
                    directInGroundOptions.appendChild(opt);
                } else if (installationValue === "underground-duct") {
                    undergroundDuctOptions.appendChild(opt);
                }

                // Create image element
                var imgDiv = document.createElement("div");
                imgDiv.className = "image-item";
                var img = document.createElement("img");
                img.src = selectedImages[index];
                img.alt = option;

                // Add error handling for image loading
                img.onerror = function() {
                    console.error("Error loading image: " + img.src);
                };

                var label = document.createElement("label");
                label.textContent = option;
                imgDiv.appendChild(img);
                imgDiv.appendChild(label);
                imageContainer.appendChild(imgDiv);

                // Add click event listener to image
                imgDiv.addEventListener("click", function() {
                    // Set the corresponding option value in the dropdown
                    if (installationValue === "air") {
                        airOptions.value = opt.value;
                        airOptions.dispatchEvent(new Event("change"));
                    } else if (installationValue === "direct-in-ground") {
                        directInGroundOptions.value = opt.value;
                        directInGroundOptions.dispatchEvent(new Event("change"));
                    } else if (installationValue === "underground-duct") {
                        undergroundDuctOptions.value = opt.value;
                        undergroundDuctOptions.dispatchEvent(new Event("change"));
                    }
                });
            });
        }
    }

    function handleInstallationChange() {
        var selectedValue = installationSelect.value;

        // Hide all dropdowns
        airDropdown.style.display = "none";
        directInGroundDropdown.style.display = "none";
        undergroundDuctDropdown.style.display = "none";

        if (selectedValue === "air") {
            airDropdown.style.display = "flex";
        } else if (selectedValue === "direct-in-ground") {
            directInGroundDropdown.style.display = "flex";
        } else if (selectedValue === "underground-duct") {
            undergroundDuctDropdown.style.display = "flex";
        }

        updateOptions();
    }

    coresSelect.addEventListener("change", updateOptions);
    installationSelect.addEventListener("change", handleInstallationChange);

    // Initialize the options and dropdown display
    updateOptions();
    handleInstallationChange();
});




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
            trayImage.src = 'static/image/Cable Ladder/CLE_LeftReducer.png';
            break;
        case "cableTray":
            trayImage.src = 'static/image/CTC/CTC_StraightReducer.png';
            break;
        case "meshTray":
            trayImage.src = 'static/image/Mesh Tray/Mesh Tray.jpg';
            break;
        case "pvcCableTrunking":
            trayImage.src = 'static/image/PVC Trunking/2.jpg';
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

const input = document.getElementById('powerFactor');
const defaultValue = '0.85';

input.addEventListener('focus', function() {
    if (input.value === defaultValue) {
        input.value = '';
        input.classList.remove('default-value');
    }
});

input.addEventListener('blur', function() {
    if (input.value === '') {
        input.value = defaultValue;
        input.classList.add('default-value');
    }
});

document.getElementById('save-button-fixed').addEventListener('click', function() {
    const form = document.getElementById('fixed-form');
    const elements = form.querySelectorAll('input, select');

    elements.forEach(function(element) {
        element.disabled = true;
    });
});

document.getElementById('reset-button-fixed').addEventListener('click', function() {
    const form = document.getElementById('fixed-form');
    const elements = form.querySelectorAll('input, select');

    elements.forEach(function(element) {
        if (element.type === 'select-one') {
            element.selectedIndex = 0;
        } else if (element.type === 'text') {
            element.value = ''; 
        }
        element.disabled = false;
    });

    
    document.getElementById('powerFactor').value = '0.85';
    document.getElementById('temperature').value = '0';
});

document.addEventListener("DOMContentLoaded", function() {
    // Your existing JavaScript code

    // Calculate Button
    var calculateButton = document.getElementById("calculateButton");
    calculateButton.addEventListener("click", function() {
        // Add your calculation logic here
        alert("Calculating...");
    });

    // Reset Button
    var resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", function() {
        // Reset all form inputs
        var inputs = document.querySelectorAll("input");
        inputs.forEach(function(input) {
            input.value = ""; 
        });

        
        var selects = document.querySelectorAll("select");
        selects.forEach(function(select) {
            select.selectedIndex = 0;
        });
    });
});
function selectInstallationType(type) {
    // Set the radio button to checked
    document.querySelector(`input[value="${type}"]`).checked = true;

    // Remove the 'selected' class from all installation types
    const installationTypes = document.querySelectorAll('.installation-type');
    installationTypes.forEach(element => {
        element.classList.remove('selected');
    });

    // Add the 'selected' class to the selected installation type
    document.querySelector(`input[value="${type}"]`).parentElement.classList.add('selected');
}

function changeSupportType() {
    var dropdown = document.getElementById("typeOfSupport");
    var selectedValue = dropdown.value;

    // Ẩn tất cả các ảnh và loại bỏ lớp 'active' trước khi hiển thị ảnh tương ứng
    var images = document.getElementsByClassName("support-image");
    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("active");
        images[i].style.border = "none";
    }

    // Hiển thị ảnh tương ứng với giá trị dropdown đã chọn và làm nổi bật
    var selectedImage = document.getElementById("supportImage1"); // Mặc định chọn ảnh đầu tiên
    switch (selectedValue) {
        case "Welded Steel Support":
            selectedImage = document.getElementById("supportImage1");
            break;
        case "Steel Support with Anchor Bolt":
            selectedImage = document.getElementById("supportImage2");
            break;
        case "Steel Support with Nut Bolt/Screw":
            selectedImage = document.getElementById("supportImage3");
            break;
        case "Threaded Rod Support with Clamp":
            selectedImage = document.getElementById("supportImage4");
            break;
        case "Threaded Rod Support with Anchor Bolt":
            selectedImage = document.getElementById("supportImage5");
            break;
        default:
            selectedImage = document.getElementById("supportImage1");
            break;
    }

    selectedImage.classList.add("active");
    selectedImage.style.border = "2px solid red"; // Viền đỏ xung quanh ảnh được chọn
}

function selectSupportType(supportType) {
    var dropdown = document.getElementById("typeOfSupport");
    dropdown.value = supportType; // Đặt giá trị dropdown bằng giá trị của ảnh được chọn
    changeSupportType(); // Cập nhật hiển thị ảnh và viền
}

//flow1
