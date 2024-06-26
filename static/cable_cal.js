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

    function saveData() {
        var table = document.getElementById('resultTable');
        var tableBody = table.querySelector('tbody');
        var rows = Array.from(tableBody.querySelectorAll('tr'));
        var data = rows.map(row => {
            var cells = Array.from(row.querySelectorAll('td')).slice(0, -1); // Exclude the last cell which contains the delete button
            return cells.map(cell => cell.textContent);
        });
        localStorage.setItem('tableData', JSON.stringify(data));
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

        var MaximumDeltaU = parseFloat(document.getElementById("u").value);

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

        let checkDerating = document.getElementById('derating-factor');

        var cableTraySegment = document.getElementById('cableTraySegment').value;

        // Gọi Json
        // Sử dụng Fetch API để tải file JSON
        let cableName = null;
        let cableDiameter = null;

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

                jsonData.forEach(cable => {
                    all.push(cable);
                });

                // Kiểm tra kết quả
                // console.log(all);

                fetch('static/cablemethodvalue.json')
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
                            switch (method.cable_method_id) {
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
                        methodId1.sort((a, b) => a.cable_value_current - b.cable_value_current);
                        methodId2.sort((a, b) => a.cable_value_current - b.cable_value_current);
                        methodId3.sort((a, b) => a.cable_value_current - b.cable_value_current);
                        methodId4.sort((a, b) => a.cable_value_current - b.cable_value_current);
                        methodId5.sort((a, b) => a.cable_value_current - b.cable_value_current);
                        methodId6.sort((a, b) => a.cable_value_current - b.cable_value_current);
                        methodId7.sort((a, b) => a.cable_value_current - b.cable_value_current);
                        methodId8.sort((a, b) => a.cable_value_current - b.cable_value_current);
                        methodId9.sort((a, b) => a.cable_value_current - b.cable_value_current);

                        let step7111 = CalculateStep7(MethodOfInstallation, conductorsMoC, checkCurrent, selectTypeSystem, selectNoOfCore);
                        // let step7116 = step7111[0] * publicCorrectFactor;
                        // console.log(publicCorrectFactor);
                        // console.log(nameCable);
                        // console.log(finalLength);
                        // console.log("TVD: ", TVDresult);
                        // console.log("TVDpercent: ", TVDpercentResult);
                        // console.log("Current new: ", step7111[0]);

                        //----------------------------Cable name-------------------------------------
                        let cableId = null;
                        for(const item of methodId1) {
                            if(item.cable_value_current == step7111[0]) {
                                cableId = item.cable_id;
                                break;
                            }
                        }

                        console.log(cableId);

                        if(cableId != null) {
                            for(const item of all) {
                                if(item.Cable_id == cableId) {
                                    cableName = item.Cable_name;
                                    break;
                                }
                            }
                        }

                        if(cableId != null) {
                            for(const item of all) {
                                if(item.Cable_id == cableId) {
                                    cableDiameter = item.Cable_diameter;
                                    break;
                                }
                            }
                        }
                         
                        console.log("Cable Diameter: ", cableDiameter);

                        console.log("Cable name: ", cableName);

                        let CablePE = cableName.split(' 0.6/1 kV')[0];
                        console.log("CablePE: ", CablePE);

                        //---------------table------------------
                        updateTable(cableName, step7111[1], CablePE, cableDiameter);                                 
                        //-----------------------------------------------------------------------------------      
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

        function updateTable(cableName, voltageDrop, CablePE, cableDiameter) {
            var table = document.getElementById('resultTable');
            var tableBody = table.querySelector('tbody');

            console.log("Cable 2: ", cableName);

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

            var cableTraySegmentCell = document.createElement('td');
            cableTraySegmentCell.textContent = cableTraySegment;
            newRow.appendChild(cableTraySegmentCell);

            var insulationCell = document.createElement('td');
            insulationCell.textContent = typeOfInsulation;
            newRow.appendChild(insulationCell);

            var powerFactorCell = document.createElement('td');
            powerFactorCell.textContent = powerFactor;
            newRow.appendChild(powerFactorCell);

            var VoltageDropCell = document.createElement('td');
            VoltageDropCell.textContent = voltageDrop;
            newRow.appendChild(VoltageDropCell);

            var DiameterCell = document.createElement('td');
            DiameterCell.textContent = cableDiameter;
            newRow.appendChild(DiameterCell);

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
                saveData();
            });
    
            deleteCell.appendChild(deleteButton);
            // Thêm ô chứa nút xóa vào hàng mới
            newRow.appendChild(deleteCell);
    
            tableBody.appendChild(newRow);
            //Local storage
            saveData();
            //---------------------------------------------------------------
            //-------------------------Excel---------------------------------
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

                var headerRow = [];
                for (var j = 0; j < table.rows[0].cells.length - 1; j++) {
                    headerRow.push(table.rows[0].cells[j].textContent);
                }

                headerRow.push("Name of Area/Plant/Zone");
                headerRow.push("Area/Plant/Zone Number");
                headerRow.push("Name of Equipment");
                headerRow.push("Equipment Tag");
                headerRow.push("Quantity");
                headerRow.push("Current");

                data.push(headerRow);
                
                for (var i = 1; i < table.rows.length; i++) {
                    var rowData = [];
                    for (var j = 0; j < table.rows[i].cells.length - 1; j++) { //không lấy cột cuối trong table html
                        rowData.push(table.rows[i].cells[j].textContent);
                    }

                    var areaPlantZoneName = document.getElementById('areaPlantZoneName').value;
                    var areaPlantZoneNumber = document.getElementById('areaPlantZoneNumber').value;
                    var equipmentName = document.getElementById('equipmentName').value;
                    var equipmentTag = document.getElementById('equipmentTag').value;
                    var quantity = document.getElementById('quantity').value;
                    var current = document.getElementById('current').value;

                    rowData.push(areaPlantZoneName);
                    rowData.push(areaPlantZoneNumber);
                    rowData.push(equipmentName);
                    rowData.push(equipmentTag);
                    rowData.push(quantity);
                    rowData.push(current);

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
        }

        var MethodOfInstallation = document.getElementById('installation').value;
        var conductorsMoC = document.getElementById('conductors').value;
        let newCurrent = null;
        let VoltageDrop = null; 
        function CalculateStep7(MethodOfInstallation, conductorsMoC, n, selectTypeSystem, selectNoOfCore) {
            if(!checkDerating.checked) {
                if(MethodOfInstallation == "air" && conductorsMoC == "Copper") {
                    if (selectTypeSystem == "1Ph+N") {
                        if(selectNoOfCore == "single") {
                            for (let i = 0; i < methodId1.length; i++) {
                                var currentValue = methodId1[i].cable_value_current;
                                if(currentValue > n) {
                                    newCurrent = currentValue;
                                    VoltageDrop = methodId1[i].cable_value_voltage_drop;

                                    console.log("new current: ", newCurrent);

                                    var newCurrent2 = newCurrent * publicCorrectFactor;
                                    console.log("newCurrent2: ", newCurrent2);

                                    if (checkCurrent > newCurrent2) {
                                        continue;
                                    }

                                    var TVD = VoltageDrop * 0.001 * checkCurrent * finalLength;
                                    var TVDpercent = ((TVD * 100) / selectedVoltage).toFixed(2);

                                    console.log("TVDpercent: ", TVDpercent);

                                    if(TVDpercent > MaximumDeltaU) {
                                        continue;
                                    }

                                    break;
                                }
                            }
                            return [newCurrent, VoltageDrop];
                        }
                    }
                } else if(MethodOfInstallation== "air" && conductorsMoC == "Aluminium") {
                    
        
                } else if(MethodOfInstallation == "direct-in-ground" || MethodOfInstallation == "underground-duct" && conductorsMoC == "Copper") {
        
                
                } else {

                    
                }
            } else {
                

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
        
        var finalLength = AtoB + heightTray + heightCabinet + totalDistance + elevationChange + horizontalDistanceTrayCabinet + heightDistanceTrayEquipment + distanceTrayEquipment + (((AtoB + heightTray + heightCabinet + totalDistance + elevationChange + horizontalDistanceTrayCabinet + heightDistanceTrayEquipment + distanceTrayEquipment) * cableLengthSpareFactor) / 100);
        // console.log(AtoB);
        // console.log(heightTray);
        // console.log(heightCabinet);
        // console.log(totalDistance);
        // console.log(elevationChange);
        // console.log(horizontalDistanceTrayCabinet);
        // console.log(heightDistanceTrayEquipment);
        // console.log(distanceTrayEquipment);
        // console.log(cableLengthSpareFactor);

        //--------------------------------------------------------------
        var selectNumberCore = document.getElementById('air-options').value;

        console.log(selectNumberCore);
        // --------------------- local storage -------------------------
        localStorage.setItem('current', current);
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
