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
    var  zonesegment = document.getElementById('zoneSegment');
    var totalCableSegment = document.getElementById('totalCables');
    var totalDiameter = document.getElementById('totalDiameter');

    function updateSegment() {
        var selectSegment = zonesegment.value;
        var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        
        var total = tableData.filter(row => row[4] === selectSegment).length;
        totalCableSegment.value = total;

        totalDiameter.value = tableData.reduce(function(total, row){
            if(row[4] == selectSegment) {
                return (total + parseFloat(row[8]));
            }
            return total;
        }, 0);
    }

    zonesegment.addEventListener('change', updateSegment);

    updateSegment();

});
