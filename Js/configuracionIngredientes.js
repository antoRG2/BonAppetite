$(document).ready(function () {

    //abre pop-up de cada fila en la tabla
    $("#ingredients").delegate('tr', 'click', function () {
       //Aqui va el ajax call que llena el pop-up formulario con
        //la informacion del ingrediente

        //abre el pop-up
        $("#ingredient").modal();
    });

   //abre pop-up para nuevo ingrediente
   $('#addProduct').on("click", function () {
        cleanPopUp();
       //abre modal
        $("#ingredient").modal();
    });

    //Guarda nuevo ingrediente
   $('#addIngredient').on("click", function () {

       //Aqui va el ajax call que guarda la informacion


       //cierra pop up
       cleanPopUp();
       $("#ingredient").modal('toggle');;
       
   });

    //Elimina ingrediente
   $('#deleteIngredient').on("click", function () {
       //Aqui va el ajax call que elimina el ingrediente

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


    //NOTA: LOS INGREDIENTES EN LA TABLA ESTAN QUEMADOS EN ESTE MOMENTO
    //AL TERMINAR LOS AJAX CALL POR FAVOR RECUERDE QUITARLOS DEL HTML, GRACIAS.
});
