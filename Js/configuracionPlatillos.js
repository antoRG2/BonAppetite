$(document).ready(function () {

    loadDishes();

    //carga tabla
    function loadDishes() {
        $.ajax({
            url: "api/Productos/",
            type: 'GET',
            dataType: "json",
            success: function (response) {
                jQuery.each(name, function (i, data) {
                    $("#dishes tbody").append(
                        "<tr><th>" + data.nombrePlatillo + "</th>" +
                        "<th>" + data.descripcion + "</th>" +
                        "<th>" + data.precioVenta + "</th>" +
                        "<th>" + data.utilidad + "</th></tr>");
                });
            }
        });
    }

	//abre pop-up de cada fila en la tabla
	$("#dishes").delegate('tr', 'click', function () {
        var code = $(this).closest("tr").find('td:eq(0)').text();
        $.ajax({
            url: "api/Productos/",
            type: 'GET',
            data: "cod_Producto=" + code,
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    jQuery.each(name, function (i, data) {
                        $("#nombrePlatillo").val(data.nombrePlatillo);
                        $("#descripcion").val(data.descripcion);
                        $("#precioVenta").val(data.precioVenta);
                        $("#precioCosto").val(data.precioCosto);
                        $("#utilidad").val(data.utilidad);
                    });
                    //abre el pop-up
                    $("#dish").modal();
                }
            }
        });  
	});

	//abre pop-up para nuevo Platillo
	$('#addDish').on("click", function () {
		cleanPopUp();
		//abre modal
		$("#dish").modal();
	});

	//Guarda nuevo Platillo
	$('#saveDish').on("click", function () {
        e.preventDefault();
        var nombrePlatillo= $("#nombrePlatillo").val();
        var descripcion= $("#descripcion").val();
        var precioVenta= $("#precioVenta").val();
        var precioCosto = $("#precioCosto").val();
        var utilidad= $("#utilidad").val();

        var dataString = 'nombrePlatillo=' + nombrePlatillo + '&descripcion=' + descripcion +
            '&precioVenta=' + precioVenta + '&precioCosto=' + precioCosto + '&utilidad=' + utilidad;

        $.ajax({
            type: 'POST',
            data: dataString,
            url: "api/Productos/",
            success: function (data) {
                alert(data);
            }
        });
		//cierra pop up
		cleanPopUp();
		$("#dish").modal('toggle');
	});

	//limpia campos pop-up 
	function cleanPopUp() {
        $("#nombrePlatillo").val("");
        $("#descripcion").val("");
        $("#precioVenta").val("");
        $("#precioCosto").val("");
        $("#utilidad").val("");
	}

});
