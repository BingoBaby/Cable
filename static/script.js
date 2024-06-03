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
    // HP to kW
    function hpToKw(hp) {
        return (hp * 0.7457).toFixed(4);
    }

    //CurrentInput
    function CurrentInput(power, voltage, powerFactor) {
        return (power  * 1000) / (voltage * powerFactor)
    }

    //CurrentCalculate
    function CurrentCalculate(power, voltage, powerFactor) {
        return (power * 1000) / (1.733 * voltage * powerFactor)
    }

    //---step 8.2
    function TVD(vd, current, finalLength) {
        return vd * 0.001 * (current * 1.5) * finalLength;
    }

    function TVDpercent(TVD, PtoPvoltage) {
        return (TVD * 100) / PtoPvoltage;
    }
     
    // Calculate Button
    var calculateButton = document.getElementById("calculateButton");
    calculateButton.addEventListener("click", function() {
        // Add your calculation logic here
        var powerInput = parseFloat(document.getElementById("power").value);
        
        // Get selected unit
        var unitSelect = document.getElementById("unit");
        var selectedUnit = unitSelect.options[unitSelect.selectedIndex].text;

        //get voltage values
        var selectedVoltage = parseFloat(document.getElementById("voltage").value);

        //get powerFactor
        var powerFactor = parseFloat(document.getElementById("powerFactor").value);

        var currentSelect = document.getElementById("current1");
        var selectedCurrent = currentSelect.options[currentSelect.selectedIndex].text;

        // HP to kW if selected unit is HP
        if (selectedUnit === "HP") {
            var powerInKW = hpToKw(powerInput);
            // Show the result in a pop-up
            // alert("Power in kW: " + powerInKW);
        } else {
            // Show the input value if unit is kW       
            // alert("Power in kW: " + powerInput);
            var powerInKW = powerInput;
        }

        if(selectedCurrent == "Input") {
            var I = parseFloat((CurrentInput(powerInKW, selectedVoltage, powerFactor)).toFixed(4));
            // alert("Output: " + I);
        } else {
            var I = parseFloat((CurrentCalculate(powerInKW, selectedVoltage, powerFactor)).toFixed(4));
            // alert("Output: " + I);
        }

        //---------------------------step 7 ----------------------------
        var current = parseFloat(document.getElementById('current').value);

        var checkCurrent = current * 1.5;

        var selectTypeSystem = document.getElementById('typeSystem').value;

        var selectNoOfCore = document.getElementById('cores').value;

        var typeOfInsulation = document.getElementById('insulation').value;

        var peMOC = document.getElementById('peMoc').value;
        var voltageRating = document.getElementById('voltageRating').value;
        // Gọi Json
        // Sử dụng Fetch API để tải file JSON
        fetch('static/DataCable.json')
            .then(response => {
                // Kiểm tra xem request có thành công không
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                // Parse JSON từ response
                return response.json();
            })
            .then(jsonData => {
                // Tạo danh sách các dây dựa trên Material_protection
                const all = [];
                const CuUA = [];
                const CuA = [];
                const AlUA = [];

                jsonData.forEach(cable => {
                    all.push(cable);
                    switch (cable.Material_protection) {
                        case 1:
                            CuUA.push(cable);
                            break;
                        case 2:
                            CuA.push(cable);
                            break;
                        case 3:
                            AlUA.push(cable);
                            break;
                        default:
                            console.error('Unknown Material_protection value:', cable.Material_protection);
                    }
                });

                // Kiểm tra kết quả
                // console.log('CuUA:', CuUA);
                // console.log('CuA:', CuA);
                // console.log('AlUA:', AlUA);
                // console.log(all);
                // console.log('CuUA: ', CuUA);
                fetch('static/cablemethoddata.json')
                    .then(response => {
                        // Kiểm tra xem request có thành công không
                        if (!response.ok) {
                        throw new Error('Network response was not ok');
                        }
                        // Parse JSON từ response
                        return response.json();
                    })
                    .then(jsonData => {
                        // Tạo danh sách các dây dựa trên Material_protection
                        methodId1 = [];
                        methodId2 = [];
                        methodId3 = [];
                        methodId4 = [];
                        methodId5 = [];
                        methodId6 = [];
                        methodId7 = [];
                        methodId8 = [];
                        methodId9 = [];

                        jsonData.forEach(method => {
                            switch (method.Cable_method_id) {
                                case 1:
                                    methodId1.push(method);
                                    break;
                                case 2:
                                    methodId2.push(method);
                                    break;
                                case 3:
                                    methodId3.push(method);
                                    break;
                                case 4:
                                    methodId4.push(method);
                                    break;
                                case 5:
                                    methodId5.push(method);
                                    break;
                                case 6:
                                    methodId6.push(method);
                                    break;
                                case 7:
                                    methodId7.push(method);
                                case 8:
                                    methodId8.push(method);
                                case 9:
                                    methodId9.push(method);
                                    break;
                                default:
                                    console.error('Unknown Material_protection value:', cable.Material_protection);
                            }
                        });

                        // Kiểm tra kết quả
                        methodId1.sort((a, b) => a.Cable_value_current - b.Cable_value_current);
                        methodId2.sort((a, b) => a.Cable_value_current - b.Cable_value_current);
                        methodId3.sort((a, b) => a.Cable_value_current - b.Cable_value_current);
                        methodId4.sort((a, b) => a.Cable_value_current - b.Cable_value_current);
                        methodId5.sort((a, b) => a.Cable_value_current - b.Cable_value_current);
                        methodId6.sort((a, b) => a.Cable_value_current - b.Cable_value_current);
                        methodId7.sort((a, b) => a.Cable_value_current - b.Cable_value_current);
                        methodId8.sort((a, b) => a.Cable_value_current - b.Cable_value_current);
                        methodId9.sort((a, b) => a.Cable_value_current - b.Cable_value_current);

                        let step7111 = CalculateStep7(MethodOfInstallation, conductorsMoC, checkCurrent, selectTypeSystem, selectNoOfCore);
                        // console.log(methodId1[4]);
                        let step7116 = step7111[0] * publicCorrectFactor;
                
                        // console.log(publicCorrectFactor);
                        console.log(step7111[0]);
                        // console.log(nameCable);
                        let vd = parseFloat(step7111[1]);
                        // console.log(finalLength);
                        let TVDresult = TVD(vd, current, finalLength);
                        // console.log("TVD: ", TVDresult);
                        let TVDpercentResult = (TVDpercent(TVDresult, selectedVoltage).toFixed(2));
                        // console.log("TVDpercent: ", TVDpercentResult);
                        // console.log("Current new: ", step7111[0]);

                        let cableId = null;
                        for(const item of methodId1) {
                            if(item.Cable_value_current == step7111[0]) {
                                cableId = item.Cable_id;
                                break;
                            }
                        }

                        console.log(cableId);

                        let cableName = null;
                        if(cableId != null) {
                            for(const item of all) {
                                if(item.Cable_id == cableId) {
                                    cableName = item.Cable_name;
                                    break;
                                }
                            }
                        }

                        console.log("Cable name: ", cableName);

                        let CablePE = cableName.split(' 0.6/1 kV')[0];
                        console.log("CablePE: ", CablePE);
                        //---------------table------------------
                        var table = document.getElementById('resultTable');
                        var tableBody = table.querySelector('tbody');
                        if(!tableBody) {
                            tableBody= document.createElement('tbody');
                            table.appendChild(tableBody);
                        }

                        var newRow = document.createElement('tr');

                        var powerCell = document.createElement('td');
                        powerCell.textContent = powerInKW;
                        newRow.appendChild(powerCell);

                        var PeMocCell = document.createElement('td');
                        PeMocCell.textContent = peMOC;
                        newRow.appendChild(PeMocCell);

                        var cableNameCell = document.createElement('td');
                        cableNameCell.textContent = cableName;
                        newRow.appendChild(cableNameCell);

                        var cablePECell = document.createElement('td');
                        cablePECell.textContent = CablePE;
                        newRow.appendChild(cablePECell);

                        var insulationCell = document.createElement('td');
                        insulationCell.textContent = typeOfInsulation;
                        newRow.appendChild(insulationCell);

                        var powerFactorCell = document.createElement('td');
                        powerFactorCell.textContent = powerFactor;
                        newRow.appendChild(powerFactorCell);

                        var VoltageDropCell = document.createElement('td');
                        VoltageDropCell.textContent = step7111[1];
                        newRow.appendChild(VoltageDropCell);

                        var FinalLengthCell = document.createElement('td');
                        FinalLengthCell.textContent = finalLength;
                        newRow.appendChild(FinalLengthCell);

                        var deleteCell = document.createElement('td');
                        // Tạo nút xóa
                        var deleteButton = document.createElement('button');
                        deleteButton.textContent = 'X';
                        deleteButton.classList.add('delete-button'); // Thêm lớp cho nút xóa để dễ dàng chọn bằng JavaScript
                        // Gắn sự kiện click cho nút xóa
                        deleteButton.addEventListener('click', function() {
                            // Xóa hàng khi nút xóa được nhấp vào
                            newRow.remove();
                        });
                
                        deleteCell.appendChild(deleteButton);
                        // Thêm ô chứa nút xóa vào hàng mới
                        newRow.appendChild(deleteCell);
                
                        tableBody.appendChild(newRow);
                        //--------------------------------------
                        document.getElementById('exportButton').addEventListener('click', function() {
                            // Tạo một Workbook mới
                            var wb = XLSX.utils.book_new();
                            
                            // Tạo một mảng chứa dữ liệu từ bảng HTML
                            var data = [];
                            //Thêm 4 dòng trống trong excel
                            for (var i = 0; i < 4; i++) {
                                data.push([""]); // Thêm một mảng rỗng vào mảng dữ liệu
                            }

                            var table = document.getElementById('resultTable');
                            for (var i = 0; i < table.rows.length; i++) {
                                var rowData = [];
                                for (var j = 0; j < table.rows[i].cells.length - 1; j++) { //không lấy cột cuối trong table html
                                    rowData.push(table.rows[i].cells[j].textContent);
                                }
                                data.push(rowData);
                            }
                        
                            // Tạo một Worksheet từ mảng dữ liệu
                            var ws = XLSX.utils.aoa_to_sheet(data);
                        
                            // Điều chỉnh độ rộng của các cột dựa trên nội dung
                            var range = XLSX.utils.decode_range(ws['!ref']);
                            for (var C = range.s.c; C <= range.e.c; ++C) {
                                var maxCellLength = 0;
                                for (var R = range.s.r; R <= range.e.r; ++R) {
                                    var cellAddress = {c: C, r: R};
                                    var cellRef = XLSX.utils.encode_cell(cellAddress);
                                    if (!ws[cellRef]) continue;
                                    var cellLength = ws[cellRef].v.toString().length;
                                    if (cellLength > maxCellLength) maxCellLength = cellLength;
                                }
                                ws['!cols'] = ws['!cols'] || [];
                                ws['!cols'][C] = {wch: maxCellLength + 2}; // Tăng kích thước một chút để tránh tràn nội dung
                            }
                        
                            // Căn giữa các giá trị trong các ô
                            var range = XLSX.utils.decode_range(ws['!ref']);
                            for (var R = range.s.r; R <= range.e.r; ++R) {
                                for (var C = range.s.c; C <= range.e.c; ++C) {
                                    var cellAddress = {c: C, r: R};
                                    var cellRef = XLSX.utils.encode_cell(cellAddress);
                                    if (!ws[cellRef]) continue;
                                    ws[cellRef].s = {alignment: {horizontal: 'center', vertical: 'center', wrapText: true}};
                                }
                            }
                        
                            // Thêm Worksheet vào Workbook với tên là "Data"
                            XLSX.utils.book_append_sheet(wb, ws, "Data");
                        
                            // Xuất Workbook thành file Excel
                            XLSX.writeFile(wb, 'data.xlsx');
                        });                                            
                        
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

            // cablemethoddata.json
        // let methodId1;
        // let methodId2;
        // let methodId3;
        // let methodId4;
        // let methodId5;
        // let methodId6;
        // let methodId7;
        // let methodId8;
        // let methodId9;

        
        // function Show(MethodOfInstallation){
        //     return MethodOfInstallation
        // }

        var MethodOfInstallation = document.getElementById('installation').value;
        var conductorsMoC = document.getElementById('conductors').value;
        let newCurrent = null;
        let VoltageDrop = null; 
        function CalculateStep7(MethodOfInstallation, conductorsMoC, n, selectTypeSystem, selectNoOfCore) {
            if(MethodOfInstallation == "air" && conductorsMoC == "Copper") {
                if (selectTypeSystem == "1Ph+N") {
                    if(selectNoOfCore == "single") {
                        for (const i = 0; i <= methodId1.length; i++) {
                            var currentValue = methodId1[i].Cable_value_current;
                            if(currentValue > n) {
                                newCurrent = currentValue;
                                VoltageDrop = methodId1[i].Cable_value_voltage_drop;
                                break;
                            }
                        }

                        return [newCurrent, VoltageDrop];
                    }
                }
            } 
    
            if(MethodOfInstallation== "air" && conductorsMoC == "Aluminium") {
    
            } 
    
            if(MethodOfInstallation == "direct-in-ground" || MethodOfInstallation == "underground-duct" && conductorsMoC == "Copper") {
    
            }
        }

        //--------------------------test------------------------------------
        let jsonURL = '/static/maxtemp.json'

        var temperature = document.getElementById('temperature').value;

        function findWhatIneed (data, n, m) {
            let factor = null;
            for(let key in data.ambientTemperatureCorrectionFactors) {
                let range = key.split('-').map(Number);
                if(n >= range[0] && n <= range[1]) {
                    if(m == 'PVC') {
                        factor = data.ambientTemperatureCorrectionFactors[key]['75'];
                    } else if(m == 'XLPE') {
                        factor = data.ambientTemperatureCorrectionFactors[key]['90'];
                    } else {
                        factor = data.ambientTemperatureCorrectionFactors[key]['60'];
                    }
                }
            }
            return factor;            
        }

        let publicCorrectFactor;

        fetch(jsonURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu từ URL');
                }
                return response.json();
            })
            .then(data => {
                const n = temperature; // Giá trị của n
                const m = typeOfInsulation; // Loại m

                const correctionFactor = findWhatIneed(data, n, m);
                if (correctionFactor !== null) {
                    // console.log(correctionFactor);
                    publicCorrectFactor = correctionFactor;
                } else {
                    console.log('Không tìm thấy correction factor cho giá trị n và m đã cho.');
                }
            })
            .catch(error => console.error('Đã xảy ra lỗi:', error));

        // console.log(publicCorrectFactor);
        // --------------------------step 8-----------------------------
        var AtoB = parseFloat(document.getElementById('fromAtoB').value);
        var heightTray = parseFloat(document.getElementById('heightTray').value);
        var heightCabinet= parseFloat(document.getElementById('heightCabinet').value);
        var totalDistance = parseFloat(document.getElementById('totalDistance').value);
        var elevationChange = parseFloat(document.getElementById('elevationChange').value);
        var horizontalDistanceTrayCabinet = parseFloat(document.getElementById('horizontalDistanceTrayCabinet').value);
        var heightDistanceTrayEquipment = parseFloat(document.getElementById('heightDistanceTrayEquipment').value);
        var distanceTrayEquipment= parseFloat(document.getElementById('distanceTrayEquipment').value);
        var cableLengthSpareFactor = parseFloat(document.getElementById('cable-length-spare-factor').value);
        
        var finalLength = AtoB + heightTray + heightCabinet + totalDistance + elevationChange + horizontalDistanceTrayCabinet + heightDistanceTrayEquipment + distanceTrayEquipment + ((AtoB + heightTray + heightCabinet + totalDistance + elevationChange + horizontalDistanceTrayCabinet + heightDistanceTrayEquipment + distanceTrayEquipment * cableLengthSpareFactor) / 100);
        // console.log(AtoB);
        // console.log(heightTray);
        // console.log(heightCabinet);
        // console.log(totalDistance);
        // console.log(elevationChange);
        // console.log(horizontalDistanceTrayCabinet);
        // console.log(heightDistanceTrayEquipment);
        // console.log(distanceTrayEquipment);
        // console.log(cableLengthSpareFactor);
        // console.log(finalLength);
        //--------------------------------------------------------------
        var selectNumberCore = document.getElementById('air-options').value;

        console.log(selectNumberCore);
        // --------------------- Table result -------------------------
        
        //-----------------------------------------------------------------------
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

//------------------ Hide F12, right click ---------------------
// document.addEventListener("keydown", function (event){
//     if (event.ctrlKey){
//        event.preventDefault();
//     }
//     if(event.keyCode == 123){
//        event.preventDefault();
//     }
// });

// document.addEventListener("contextmenu",event => event.preventDefault());
//---------------------------------------------------------------
//flow1

