<template>
    <div>
        {{message}}
        <div class="canvas-container">
            <canvas id="canvas"></canvas>
        </div>

        <b-modal ref="modalTable" id="modalTable" title="Cuenta Mesa 1" 
                 @ok="submit" @shown="clearName" close-title="Cerrar" ok-title="Pagar">
            <form @submit.stop.prevent="submit">

                <ul class="ul-account-check">
                    <li> 1 x Entrada Sopa de Tomate</li>
                    <li> 1 x Entrada Papas Fritas</li>
                    <li> 2 x Gaseosas</li>
                    <li> 2 x Pasta Bolognesa</li>
                </ul>

            </form>
        </b-modal>

        <b-modal ref="modalAccount" id="modalAccount" title="Nueva Cuenta" 
                 @ok="submit" @shown="clearName" close-title="No" ok-title="Si">
            <form @submit.stop.prevent="submit">

                <div class="modal-body">
                    <p>Desea abrir una nueva cuenta en esta mesa?</p>
                </div>

            </form>
        </b-modal>

    </div>
</template>

<script>
import 'fabric';

export default {
    data() {
        return {
            message: 'Administración de salones',
        }
    },
    mounted: function() {

        var canvas = new fabric.Canvas('canvas', { width: 500, height: 500 });//900 600
        var $self = this;
        canvas.backgroundColor = "#FAF7F8";
        loadConfiguration();
        canvas.getObjects();
        canvas.renderAll();

        //select table event
        canvas.on({
            'object:selected': function() {
                if (canvas._objects[0].active == true) {
                    $self.showTable();
                }
                if (canvas._objects[1].active == true) {
                    $self.showAccount();
                }
            }
        });

        // // TODO
        //crea una nueva cuenta en una mesa 
        // $('#openAccountConfirmation').on('click', function(e) {
        //     canvas._activeObject.setFill('rgb(241, 0, 69)');
        //     canvas.renderAll();
        //     $.each(tableArray, function(key, table) {
        //         $.each(canvas._objects, function(key, n) {
        //             if (table.arrayNumber == key && n.active == true) {
        //                 table.occupied = true;
        //             }
        //         });
        //     });

        //     $('#openAccountModal').modal('toggle');
        //     window.location = "../Views/menu.html";
        // });

        //carga configuracion
        function loadConfiguration() {
            var tableArray = [];
            var canvas_data = "";
            //$.ajax({
            //    url: "endpoint",
            //    type: 'GET',
            //    dataType: "json",
            //    success: function (response) {
            //canvas_data = response.data;
            canvas_data = '{"objects":[{"type":"rect","originX":"left","originY":"top","left":394,"top":58,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":397,"top":192,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":256,"top":60,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":256,"top":188,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":114,"top":60,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":114,"top":189,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":401,"top":328,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":258,"top":324,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":121,"top":327,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":405,"top":436,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":261,"top":432,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":123,"top":428,"width":50,"height":50,"fill":"rgb(146,99,5)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0}],"background":"#FAF7F8"}'
            canvas.loadFromJSON(canvas_data, canvas.renderAll.bind(canvas));

            canvas._objects.forEach((c, index) => {
                c.hasControls = false;
                c.hasBorders = false;
                c.hoverCursor = 'pointer';
                c.lockMovementX = true;
                c.lockMovementY = true;
            })

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

            tableArray.forEach((table, index) => {
                if (table.occupied == true) {
                    canvas._objects.forEach((n, cIndex) => {

                        if (table.arrayNumber == cIndex) {
                            n.setFill('rgb(241, 0, 69)');
                            canvas.renderAll();
                        }

                    });
                }
            });

        }

    },
    computed: {

    },
    components: {
    },
    methods: {
        showAccount: function() {
            this.$root.$emit('show::modal','modalAccount');
        },
        showTable: function() {
            this.$root.$emit('show::modal','modalTable');
        }
    }
}
</script>
<style>

</style>
