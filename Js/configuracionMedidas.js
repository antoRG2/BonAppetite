$(document).ready(function () {

    //carga los platillos en la tabla 
    loadMesuration();

    //abre pop-up de cada fila en la tabla
    $("#mensurations").delegate('tr', 'click', function () {
        //Aqui va el ajax call que llena el pop-up formulario con
        //la informacion del Platillo

        //abre el pop-up
        $("#mensuration").modal();
    });

    //abre pop-up para nueva medida
    $('#addMensuration').on("click", function () {
        cleanPopUp();
        //abre modal
        $("#mensuration").modal();
    });

    //Guarda nuevo Platillo
    $('#saveMensuration').on("click", function () {

        //Aqui va el ajax call que guarda la informacion

        //cierra pop up
        cleanPopUp();
        $("#mensuration").modal('toggle');

    });

    //Elimina Platillo
    $('#deleteMensuration').on("click", function () {
        //Aqui va el ajax call que elimina el Platillo

        //cierra pop up
        cleanPopUp();
        $("#mensuration").modal('toggle');
    });

    //limpia campos pop-up 
    function cleanPopUp() {
        $("#codigo").val("");
        $("#descrip").val("");
        $("#um").val("");
        $("#costo").val("");
        $("#cant").val("");
    }

    function loadMesuration() {
        //Aqui va la funcion que carga las medidas
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

    //NOTA: Las MEDIDAS EN LA TABLA ESTAN QUEMADOS EN ESTE MOMENTO
    //AL TERMINAR LOS AJAX CALL POR FAVOR RECUERDE QUITARLOS DEL HTML, GRACIAS.
});
