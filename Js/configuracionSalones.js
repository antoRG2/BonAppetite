$(document).ready(function () {

    //guarda el id de la mesa en el array junto con el 
    //numero y campos de la mesa
    var tableArray = [];

    var canvas = this.__canvas = new fabric.Canvas('canvas', { width: 500, height: 500 });//900 600
    canvas.backgroundColor = "#FAF7F8";
    loadConfiguration();
    canvas.renderAll(); 

    //abre pop up de nueva mesa
	$('#addTable').on("click",function () {
	    $("#newTableModal").modal();
	    $('#numeroMesa').val('');
	    $('#sillas').val('');
	});

    //crea nueva mesa
	$('#addTableModal').on("click",function () {
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

        var _tableSits = $('#sillas').val();
        var _tableNumber = $('#numeroMesa').val();

        var tableData = {
            arrayNumber: canvas._objects.length - 1,
            tableSits: _tableSits,
            tableNumber: _tableNumber,
            occupied: false
        };
        tableArray.push(tableData);
        debugger; 
	               
	    $('#newTableModal').modal('toggle');
	});

    //abre confirmacion de guardar salon
    $('#saveConfiguration').on("click", function () {
        $("#saveConfigModal").modal();
    });

    //guarda configuracion de salon
    $('#saveConfig').on("click", function () {
        debugger;
         
        var canvasJson = JSON.stringify(canvas);
        //guarda el array con las propiedades adicionales de las mesas
        //tableArray

        //$.ajax({
       //    type: 'POST',
       //    data: dataString,
       //    url: "endpoint",
       //    success: function (data) {
       //       
       //    }
       //});

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
                //carga el array con las propiedades adicionales de las mesas
                //tableArray
                //var tableData = {
                //    arrayNumber: canvas._objects.length - 1,
                //    tableSits: _tableSits,
                //    tableNumber: _tableNumber,
                //    occupied: false
                //};
        //    }
        //});
    }


    $('#numeroMesa').on('change', function () {
        if ($.trim($('#numeroMesa').val()) === "" || $.trim($('#sillas').val()) === "") {
            $('addTableModal').addClass('disabled');
        }
        else {
            $('addTableModal').removeClass('disabled');
        }

    });
    $('#sillas').on('change', function () { });


});