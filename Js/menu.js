$(document).ready(function () {
    var clients = [];
    var clientsOrders = [];

    document.createSvg = function (tagName) {
        var svgNS = "http://www.w3.org/2000/svg";
        return this.createElementNS(svgNS, tagName);
    };

    var numberPerSide = 20;
    var size = 10;
    var pixelsPerSide = 400;

    //TODO: esta lista deberia ser una lista de objetos con el nombre y el id de la categoria
    var categorias = ["carnes", "arroz", "ensaladas", "entradas", "postres"]
    var productos = ["tiramisu", "brownie", "helado", "pastel"]

    var grid = function (list, size, pixelsPerSide, colors) {

        numberPerSide = 3;
        var svg = document.createSvg("svg");
        svg.setAttribute("width", pixelsPerSide);
        svg.setAttribute("height", pixelsPerSide);
        svg.setAttribute("viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));

        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < numberPerSide; j++) {
                var color1 = colors[(i + j) % colors.length];
                var color2 = colors[(i + j + 1) % colors.length];
                var g = document.createSvg("g");

                g.setAttribute("transform", ["translate(", i * size, ",", j * size, ")"].join(""));
                var number = numberPerSide * i + j;
                var box = document.createSvg("rect");
                box.setAttribute("width", size);
                box.setAttribute("height", size);
                box.setAttribute("fill", color1);
                box.setAttribute("id", "b" + number);
                g.appendChild(box);

                var text = document.createSvg("text");
                text.appendChild(document.createTextNode(i * numberPerSide + j));
                text.setAttribute("fill", color2);
                text.setAttribute("font-size", 3);
                text.setAttribute("x", 0);
                text.setAttribute("y", size / 2);
                text.setAttribute("id", "t" + number);
                text.textContent = list[i];
                
                g.appendChild(text);
                svg.appendChild(g);
            }
        }

        svg.addEventListener(
            "click",
            function (e) {
                var id = e.target.id;
                if (id) {
                    $('#clients li').find('.active div').text(list[3]);
                    //loadProducts(id)

                }
            },
            false);
        return svg;
    };

    var container = document.getElementById("container");
    container.appendChild(grid(categorias, 15, 200, ["white", "green"]));


    $('#addClient').on("click", function () {
        //abre modal
        $("#clientModal").modal();
    });

    $('#backMenu').on("click", function () {
        window.location = "../Views/salon.html";
    });

    $('#saveClient').on("click", function () {
        debugger;
        clients.push($('#nombreCliente').val());
        loadClients($('#nombreCliente').val());
        saveClientsDB(clients);
        $('#clientModal').modal('toggle');
    });

    function loadClients(client) {
        $(this).closest('li').before('<li><a>New Tab</a><span>x</span></li>');
        $('#clients').append('<div class="tab-pane">new tab</div>');
        

    }

    function saveClientsDB(clientsList) {
        //Aqui va el ajax que guarda los clientes en DB
    }

    function loadCategories() {
        //ajax que carga categorias
    }

    function loadProducts(idCategory) {
        //ajax que carga productos
        debugger;
        var container = document.getElementById("container");
        var groups = container.getElementsByTagName("g");
        container.removeChild(groups);
        container.appendChild(grid(productos, 15, 200, ["white", "green"]));
    }

    $('#clients li').on("click", function () {
        $('#clients li').find('.active').removeClass('active');
        $(this).find('a').addClass('active');
    });

    $('#payButton').on("click", function () {
        //abre modal
        $("#pagoFacturaModal").modal();
    });
});