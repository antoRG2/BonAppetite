<template>
    <div>
        {{ message}}
        <div class="container">
            <section>
                <div class="canvas-container">
                    <canvas id="canvasConfiguration"></canvas>
                </div>
            </section>
            <br>
            <div class="text-center">
                <div>
                    <b-button variant="success" size="sm" v-b-modal.addTableModal>
                        <i class="icon-plus icons"></i> Agregar Mesa</button>
                    </b-button>
                    <b-button variant="outline-error" size="sm" @click="disableSelectedTables">
                        <i class="icon-close icons"></i> Deshabilitar Mesas</button>
                    </b-button>
                    <b-button variant="outline-success" size="sm" @click="enableSelectedTables">
                        <i class="icon-check icons"></i> Habilitar Mesas</button>
                    </b-button>
                    <b-button variant="success" size="sm" @click="saveConfiguration">
                        <i class="icon-close icons"></i> Salvar Configuracion</button>
                    </b-button>
                </div>
            </div>

        </div>

        <!-- Table Modal-->

        <b-modal ref="addTableModal" id="addTableModal" title="Agregar Mesa" @shown="clearData" @ok="createTableListener" ok-title="Agregar">
            <form @submit.stop.prevent="submit">
                <div class="form-group">
                    <label for="numeroMesa">Numero de Mesa</label>
                    <input type="number" class="form-control" v-model="table.number" min="1" required>
                </div>
                <div class="form-group">
                    <label for="sillas">Cantidad de Sillas</label>
                    <input type="number" class="form-control" v-model="table.chairs" required min="1">
                </div>
            </form>
        </b-modal>

        <!--Modal-->

        <!-- Success Modal-->

        <b-modal ref="successModal" id="successModal" title="Configuracion Guardada" :hide-footer="true">
            <form @submit.stop.prevent="submit">
                <div class="form-group">
                    Configuracion Guardada con exito.
                </div>
            </form>
        </b-modal>

        <!--Modal-->
    </div>
</template>
<script>
export default {
    props: ['tables', 'floor'],
    data() {
        return {
            message: 'Configuracion de salones',
            tableArray: [],
            table: {
                number: '',
                chairs: ''
            },
            canvas: {},
            selectedObjects: []
        }
    },
    created: function() {
        this.$on('hook:afterDestroy', function() {
            
        })
    },
    route: {
        deactivate: function() {
            //stop sending requests
            
        }
    },
    mounted: function() {

        var canvas = new fabric.Canvas('canvasConfiguration', this.floor.size);
        canvas.backgroundColor = this.floor.backgroundColor;
        this.loadConfiguration(canvas, JSON.parse(JSON.stringify(this.tables)), this.floor);
        canvas.renderAll();

        this.canvas = canvas;
    },
    computed: {
    },
    components: {
    },
    methods: {
        loadConfiguration: function(canvas, tables, floor) {
            let self = this;
            let canvas_data = this.tablesConfiguration;

            tables.forEach(table => {
                if (!table.rect) {
                    table.rect = {
                        left: 50,
                        top: 50
                    }
                }
                table.rect = this.addTableRect(canvas, table.rect);
                this.tableArray.push(table);
            });

            canvas.renderAll();

            canvas.on('object:selected', function(event) {
                let objects = [];
                if (event.target) {
                    if (event.target._objects) {
                        objects = event.target._objects;
                    } else {
                        objects = [event.target];
                    }
                    self.objectsSelected(objects);
                }
            });
        },
        createTableListener: function( _event ) {
            const _table = this.table;
            const _canvas = this.canvas;
            
            if(!_table || !_table.number || !_table.chairs) {
                _event.cancel();
                alert('Por favor ingrese un número valido de mesas y sillas.');
                return;
            }

            this.addTable(_canvas, _table.chairs, _table.number);
        },
        addTable: function(_canvas, _tableSits, _tableNumber, tablePosX, tablePosY) {
            let rect = this.createTableRect(_canvas, tablePosX || 50, tablePosY || 50);

            var tableData = {
                arrayNumber: _canvas._objects.length - 1,
                rect: rect,
                tableSits: _tableSits,
                tableNumber: _tableNumber,
                occupied: false,
                disabled: false
            };

            this.tableArray.push(tableData);
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
        createTableRect: function(_canvas, left, top) {
            var rect = new fabric.Rect({
                width: 50,
                height: 50,
                left: left,
                top: top,
                fill: 'rgb(146,99,5)'
            })

            _canvas.getObjects();
            _canvas.add(rect);
            _canvas.selection = true;
            _canvas.renderAll();
            _canvas.calcOffset();

            return rect;
        }, clearData: function() {
            this.table.number = '';
            this.table.chairs = '';
        }, objectsSelected: function(_objects) {
            let objectsData = this.tableArray.filter((ta, index) => {
                return ta.rect.active;
            })
            
            this.selectedObjects = objectsData;
        }, disableSelectedTables: function() {
            this.selectedObjects.forEach(so => {
                so.rect.set('fill', 'rgb(141,147,103)');
                so.disabled = true;
            });
            this.canvas.renderAll();
        }, enableSelectedTables: function() {
            this.selectedObjects.forEach(so => {
                so.rect.set('fill', 'rgb(146,99,5)');
                so.disabled = true;
            });
            this.canvas.renderAll();
        }, saveConfiguration: function() {
            this.$emit('save:configuration', this.tableArray, this.floor);
            this.$refs.successModal.show();
        }
    }
}

</script>
<style>
.canvas-container {
    display: flex;
    justify-content: center;
}
</style>

