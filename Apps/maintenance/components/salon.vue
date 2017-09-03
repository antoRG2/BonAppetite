<template>
    <div>
        {{message}}
        <div class="canvas-container">
            <canvas id="canvasFloor"></canvas>
        </div>
        <section>
            <b-button variant="warning" size="sm" @click="openAccount">
                <i class="icon-pin icons"></i>Abrir Cuenta</button>
            </b-button>
        </section>

        <b-modal ref="modalTable" id="modalTable" title="Cuenta Mesa 1" @ok="submit" @shown="clearName" close-title="Cerrar" ok-title="Pagar">
            <form @submit.stop.prevent="submit">

                <ul class="ul-account-check">
                    <li> 1 x Entrada Sopa de Tomate</li>
                    <li> 1 x Entrada Papas Fritas</li>
                    <li> 2 x Gaseosas</li>
                    <li> 2 x Pasta Bolognesa</li>
                </ul>

            </form>
        </b-modal>

        <!-- Success Modal-->

        <b-modal ref="openAccountModal" id="openAccountModal" title="Nueva Cuenta" close-title="Cerrar" @ok="openAccount" ok-title="Ir a la seleccion de Menu">
            <form @submit.stop.prevent="submit">
                <div class="form-group">
                    Desea abrir una nueva cuenta en esta mesa?
                </div>
            </form>
        </b-modal>

        <!--Modal-->

    </div>
</template>

<script>
import 'fabric';

export default {
    props: ['tables', 'floor'],
    data() {
        return {
            message: 'Administración de salones',
            tableArray: [],
            selectedObjects: [],
            canvas:{}
        }
    },
    mounted: function() {
        var canvas = new fabric.Canvas('canvasFloor', this.floor.size);
        canvas.backgroundColor = this.floor.backgroundColor;
        this.loadConfiguration(canvas, JSON.parse(JSON.stringify(this.tables)), this.floor);
        canvas.renderAll();
        this.canvas = canvas;
        //select table event
        canvas.on({
            'object:selected': (event) => {
                let objects = [];
                if (event.target) {
                    if (event.target._objects) {
                        objects = event.target._objects;
                    } else {
                        objects = [event.target];
                    }
                    this.objectsSelected(objects);
                    this.$root.$emit('show::modal', 'openAccountModal');
                    canvas.renderAll();
                }
            }
        });

    },
    computed: {

    },
    components: {
    },
    methods: {
        showAccount: function() {
            this.$root.$emit('show::modal', 'modalAccount');
        },
        showTable: function() {
            this.$root.$emit('show::modal', 'modalTable');
        },
        addTableRect: function(_canvas, rect) {
            var rect = new fabric.Rect(rect);
            _canvas.getObjects();
            _canvas.add(rect);
            _canvas.selection = true;
            _canvas.renderAll();
            _canvas.calcOffset();

            return rect;
        },
        loadConfiguration: function(_canvas, tables) {
            var canvas_data = "";

            tables.forEach(table => {
                if (!table.rect) {
                    table.rect = {
                        left: 50,
                        top: 50
                    }
                }
                table.rect = this.addTableRect(_canvas, table.rect);
                this.tableArray.push(table);
            });

            _canvas._objects.forEach((c, index) => {
                c.hasControls = false;
                c.hasBorders = false;
                c.hoverCursor = 'pointer';
                c.lockMovementX = true;
                c.lockMovementY = true;
            })

            _canvas.renderAll();
        }, objectsSelected: function(_objects) {
            let objectsData = this.tableArray.filter((ta, index) => {
                return ta.rect.active;
            })
            
            this.selectedObjects = objectsData;
        }, openAccount: function() {
            // change the color of the selected object
            let openTable = this.selectedObjects[0];
            openTable.rect.set('fill', 'rgb(255,30,30)');
            openTable.occupied = true;
            this.canvas.renderAll();

            this.$router.app.$emit('save:configuration', this.tableArray, this.floor);
            this.goToMenu();
        }, goToMenu: function() {
            this.$router.push('menu');
        }
    }
}
</script>
<style>

</style>
