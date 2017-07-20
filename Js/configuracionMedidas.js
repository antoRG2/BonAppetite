$(document).ready(function () {
        
    loadMesuration();

    //carga tabla
    function loadMesuration() {
        $.ajax({
            url: "api/Medida/",
            type: 'GET',
            dataType: "json",
            success: function (response) {
                jQuery.each(name, function (i, data) {
                    $("#mensurations tbody").append(
                        "<tr><th>" + data.idUnidadMedida + "</th>" +
                        "<th>" + data.nombre + "</th></tr>");
                });
            }
        });
    }

    //abre pop-up de cada fila en la tabla
    $("#mensurations").delegate('tr', 'click', function () {
        var code = $(this).closest("tr").find('td:eq(0)').text();
        $.ajax({
            url: "api/Medida/",
            type: 'GET',
            data: "cod_Producto=" + code,
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    jQuery.each(name, function (i, data) {
                        $("#id").val(data.idUnidadMedida);
                        $("#NombreUnidad").val(data.nombre);
                        
                    });
                    //abre el pop-up
                    $("#mensuration").modal();
                }
            }
        });        
    });

    //abre pop-up para nueva medida
    $('#addMensuration').on("click", function () {
        cleanPopUp();
        //abre modal
        $("#mensuration").modal();
    });

    //Guarda nueva medida
    $('#saveMensuration').on("click", function () {
        e.preventDefault();
        var id = $("#id").val();
        var descrip = $("#NombreUnidad").val();

        var dataString = 'idUnidadMedida=' + id + '&nombre=' + descrip;

        $.ajax({
            type: 'POST',
            data: dataString,
            url: "api/Medida/",
            success: function (data) {
                alert(data);
            }
        });
        //cierra pop up
        cleanPopUp();
        $("#mensuration").modal('toggle');
    });

    //limpia campos pop-up 
    function cleanPopUp() {
        $("#id").val("");
        $("#NombreUnidad").val("");
    }


});
