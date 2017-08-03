$(document).ready(function () {
    var canvas = this.__canvas = new fabric.Canvas('canvas', { width: 500, height: 500 });//900 600
    canvas.backgroundColor = "#FAF7F8";
    loadConfiguration();
    canvas.getObjects();
    canvas.renderAll();

    var tableArray = [];

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


    //crea una nueva cuenta en una mesa 
    $('#openAccountConfirmation').on('click', function (e) {
        canvas._activeObject.setFill('rgb(241, 0, 69)');
        canvas.renderAll();
        $.each(tableArray, function (key, table) {
            $.each(canvas._objects, function (key, n) {
                if (table.arrayNumber == key && n.active == true) {
                    table.occupied = true;
                }
            });           
        });

        $('#openAccountModal').modal('toggle');
        window.location = "../Views/menu.html"; 

    });

    //carga configuracion
    function loadConfiguration() {
        var canvas_data = "";
        //$.ajax({
        //    url: "endpoint",
        //    type: 'GET',
        //    dataType: "json",
        //    success: function (response) {
        //canvas_data = response.data;
        canvas_data = '{"objects":[{"type":"rect","originX":"left","originY":"top","left":394,"top":58,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":397,"top":192,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":256,"top":60,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":256,"top":188,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":114,"top":60,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":114,"top":189,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":401,"top":328,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":258,"top":324,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":121,"top":327,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":405,"top":436,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":261,"top":432,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":123,"top":428,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0}],"background":"#FAF7F8"}'
        canvas.loadFromJSON(canvas_data, canvas.renderAll.bind(canvas));
      
         $(canvas._objects).each(function (index, n) {
             n.hasControls = false;
             n.hasBorders = false;
             n.hoverCursor = 'pointer';
             n.lockMovementX = true;
             n.lockMovementY = true;
            
         });
         canvas.renderAll();
         //carga el array con las propiedades adicionales de las mesas
                //tableArray
                //var tableData = {
                //    arrayNumber: canvas._objects.length - 1,
                //    tableSits: _tableSits,
                //    tableNumber: _tableNumber,
                //    occupied: false
                //};
        //    } 
         $.each(tableArray, function (key, table) {
             $.each(canvas._objects, function (key, n) {
                 if (table.occupied == true) {
                     $.each(canvas._objects, function (key, n) {
                         if (table.arrayNumber == key) {
                             n.setFill('rgb(241, 0, 69)');
                             canvas.renderAll();
                         }
                     });     
                 }
             });
         });
    }

   
});
