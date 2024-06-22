document.addEventListener("DOMContentLoaded", function() {

    //step 4.3
    function step4_3(step4_1, step4_2) {
        return step4_1 * step4_2;
    }

    function step4_4(step4_3, SpareFactor) {
        return step4_3 + ((step4_3*SpareFactor)/100);
    }

    function FinalDiameter(HighestDiameter) {
        return HighestDiameter * 2;
    }


        // Lấy giá trị từ localStorage
    var current = localStorage.getItem('current'); // Sửa lại key phù hợp với tên của dữ liệu lưu

        // Hiển thị giá trị trong input của cable-tray-page.html
    var totalCablesInput = document.getElementById('totalCables');
    if (totalCablesInput && current !== null) { // Kiểm tra totalCablesInput và current khác null trước khi thực hiện gán giá trị
        totalCablesInput.value = current;
    }
    console.log("totalCablesInput: ", totalCablesInput);
});
