$(document).ready(function () {

    loadIngredients();

    //carga tabla
    function loadIngredients() {
        $.ajax({
            url: "/api/Ingrediente/",
            type: 'GET',
            dataType: "json",
            success: function (response) {
                jQuery.each(name, function (i, data) {
                    $("#ingredients tbody").append(
                        "<tr><th>" + data.idIngrediente + "</th>" +
                        "<th>" + data.nombre + "</th>" +
                        "<th>" + data.idUnidadMedida + "</th>" +
                        "<th>" + data.costoUnidad + "</th>" +
                        "<th>" + 0.0 + "</th></tr>");
                });
            }
        });
    }

    //abre pop-up de cada fila en la tabla
    $("#ingredients").delegate('tr', 'click', function () {
        var code = $(this).closest("tr").find('td:eq(0)').text();
        $.ajax({
            url: "/api/Ingrediente/",
            type: 'GET',
            data: "cod_Producto=" + code,
            dataType: "json",
            success: function (response) {
                if (response!=null){
                    jQuery.each(name, function (i, data) {
                        $("#codigo").val(data.idIngrediente);
                        $("#descrip").val(data.nombre);
                        $("#um").val(data.idUnidadMedida);
                        $("#costo").val(data.costoUnidad);
                        $("#cant").val(0.0);
                    });
                    //abre el pop-up
                    $("#ingredient").modal();
                }
            }
        });       
    });

    //abre pop-up para nuevo ingrediente
    $('#addProduct').on("click", function () {
       cleanPopUp();
       //abre modal
        $("#ingredient").modal();
    });

    //Guarda nuevo ingrediente
   $('#addIngredient').on("click", function () {
        e.preventDefault();
        var cod = $("#codigo").val();
        var descrip= $("#descrip").val();
        var um= $("#um").val();
        var cost=$("#costo").val();
        var cant = $("#cant").val();

        var dataString = 'idIngrediente=' + cod + '&nombre=' + descrip + '&idUnidadMedida=' + um + '&costoUnidad=' + cost;

        $.ajax({
           type: 'POST',
           data: dataString,
           url:  "/api/Ingrediente/",
           success: function (data) {
               alert(data);
           }
       });
       //cierra pop up
       cleanPopUp();
       $("#ingredient").modal('toggle');       
   });

    //limpia campos pop-up 
   function cleanPopUp() {        
        $("#codigo").val("");
        $("#descrip").val("");
        $("#um").val("");
        $("#costo").val("");
        $("#cant").val("");
    }

});
