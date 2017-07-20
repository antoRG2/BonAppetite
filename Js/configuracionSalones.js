$(document).ready(function () {
    var canvas = this.__canvas = new fabric.Canvas('canvas',{ width: 500, height: 500 });//900 600
    canvas.backgroundColor = "#FAF7F8";
    canvas.renderAll();
    var test = JSON.stringify(canvas);
    debugger;

    loadConfiguration();

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

	               
	    $('#newTableModal').modal('toggle');
	});
});

//abre confirmacion de guardar salon
$('#saveConfiguration').on("click", function () {
    $("#saveConfigModal").modal();
});

//guarda configuracion de salon
$('#saveConfig').on("click", function () {
   var test = JSON.stringify(canvas);
    debugger;

});

//elimina mesa
//$('#removeTable').on("click", function () {
//    var activeObject = canvas._activeObject;
//    canvas.remove(activeObject);  
//});

//carga configuracion
function loadConfiguration() { }