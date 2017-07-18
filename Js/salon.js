$(document).ready(function () {
    var canvas = this.__canvas = new fabric.Canvas('canvas', { width: 500, height: 500 });//900 600
    canvas.backgroundColor = "#FAF7F8";
    canvas.renderAll();
    //static tables
    var staticOccupiedRect = new fabric.Rect({
        width: 50,
        height: 50,
        left: 400,
        top: 400,
        fill: 'rgb(241, 0, 69)',
        hasControls: false,
        hasBorders: false,
        hoverCursor: 'pointer',
        lockMovementX: true,
        lockMovementY: true
    })

    var staticFreeRect = new fabric.Rect({
        width: 50,
        height: 50,
        left: 400,
        top: 250,
        fill: 'rgb(146,99,5)',
        hasControls: false,
        hasBorders: false,
        hoverCursor: 'pointer',
        lockMovementX: true,
        lockMovementY: true
    })

    canvas.getObjects();
    canvas.add(staticOccupiedRect, staticFreeRect);
    canvas.renderAll();

    //select table event
    canvas.on({
        'object:selected': function () {
            if (canvas._objects[0].active == true) {
                $("#accountCheckModal").modal();
            }
            if (canvas._objects[1].active == true) {
                $("#openAccountModal").modal();
            }
        }
    });

    $('#openAccountConfirmation').on('click', function (e) {
        canvas._activeObject.setFill('rgb(241, 0, 69)');
        canvas.renderAll();
        $('#openAccountModal').modal('toggle');
    });

    $('#addTable').on("click", function () {
        $("#newTableModal").modal();
        $('#numeroMesa').val('');
        $('#sillas').val('');
    });

    $('#addTableModal').on("click", function () {
        var rect = new fabric.Rect({
            width: 50,
            height: 50,
            left: 50,
            top: 50,
            fill: 'rgb(146,99,5)'
        })

        canvas.getObjects();
        canvas.add(rect);
        canvas.selection = true;
        canvas.renderAll();
        canvas.calcOffset();


        $('#newTableModal').modal('toggle');
    });
});
