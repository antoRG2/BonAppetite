$(document).ready(function () {

	//carga los platillos en la tabla 
	loadDishes();

	//abre pop-up de cada fila en la tabla
	$("#dishes").delegate('tr', 'click', function () {
		//Aqui va el ajax call que llena el pop-up formulario con
		//la informacion del Platillo

		//abre el pop-up
		$("#dish").modal();
	});

	//abre pop-up para nuevo Platillo
	$('#addDish').on("click", function () {
		cleanPopUp();
		//abre modal
		$("#dish").modal();
	});

	//Guarda nuevo Platillo
	$('#saveDish').on("click", function () {
		
		//Aqui va el ajax call que guarda la informacion
		
		//cierra pop up
		cleanPopUp();
		$("#dish").modal('toggle');

	});

	//Elimina Platillo
	$('#deletedish').on("click", function () {
		//Aqui va el ajax call que elimina el Platillo

		//cierra pop up
		cleanPopUp();
		$("#dish").modal('toggle');
	});

	//limpia campos pop-up 
	function cleanPopUp() {
		$("#codigo").val("");
		$("#descrip").val("");
		$("#um").val("");
		$("#costo").val("");
		$("#cant").val("");
	}

	function loadDishes() {
		//Aqui va la funcion que carga los platillos
		//cuando la pagina abre 
		//aca dejo un ejemplo
		//$.ajax({
		//	type: "POST",
		//	url: "/users/index/friendsnamefromids",
		//	data: "IDS=" + requests,
		//	dataType: "json",
		//	success: function (response) {
		//		var name = response;				
		//		var yourTableHTML = "";
		//		jQuery.each(name, function (i, data) {
		//			$("#dishes tbody").append("<tr><td>" + data + "</td></tr>");
		//		});
		//	}
		//});
	}

	//NOTA: LOS PLATILLOS EN LA TABLA ESTAN QUEMADOS EN ESTE MOMENTO
	//AL TERMINAR LOS AJAX CALL POR FAVOR RECUERDE QUITARLOS DEL HTML, GRACIAS.
});
