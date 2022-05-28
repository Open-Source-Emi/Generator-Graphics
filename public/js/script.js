///lee archivo EXCEL
function handleDrop(e) {
    $("#cargando").show();
    $("#chart").html("");
    $("#conten_tabla").html("");
    $("div.msgwarning").html("").hide();
    e.stopPropagation();
    e.preventDefault();

    var org;
    if (e.dataTransfer) {
        var files = e.dataTransfer.files;
    } else {
        var files = e.target.files;
    }
    var f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {

        var data = e.target.result;
        var wb = XLSX.read(data, {
            type: 'binary'
        });

        org = XLSX.utils.sheet_to_json(wb.Sheets["Hoja1"]);

        console.log(org);


        todoConfig(org);

        $("#archivoabr").text("Archivo Excel: " + f.name);
    };
    reader.readAsBinaryString(f);
}



/// crea cabeceras
function crearPanel(org) {
    $("ul.content_panel").html("");
    Object.keys(org[0]).map(function(item, index) {
        $("ul.content_panel").append("<li><input type='checkbox' onchange='graficar(this)' id=" + item + " name=" + item + " value=" + item + "/> <span> " + item + " </span> </li>");
    });
}

/// crea estadisticas
function crearEstadis(org) {
    $("ul.content_estadis").html("");
    var comparacion = $('#estadis').val().split(/\s*,\s*/);
    Object.keys(org[0]).map(function(item, index) {
        if (comparacion.indexOf(item) != -1) {
            $("ul.content_estadis").append("<li><input type='radio' onchange='graficarChart(this)' id=" + item + " name='estadistica' value=" + item + "/> <span> " + item + " </span> </li>");
        };
    });
}

function crearSelectoresInicio(org) {
    var columnaUno = "Provincia";
    var a = valoresUnicos(org, columnaUno);

    var selUno = $("<select/>", {
        id: columnaUno,
        name: columnaUno,
        "change": function(e) { provinciaSelect(e, columnaUno, org) }
    });

    a.map(function(x) {
        selUno.append('<option value="' + x + '">' + x + '</option>');
    })
    $("#selectProv").append(selUno)
}

function provinciaSelect(ev, columna, datos) {
    var columnaDos = "Municipio"
    var c = filtroPorColumna(datos, columna, ev.target.value);
    $("div#contenedorgraf").html("");
    var vector = $("#estadis").val().split(",");

    if ($("#multiple").is(':checked')) {
        const grafmul = "grafmultiple";
        var divmultiple = $("<div/>", {
            id: grafmul,
            class: "col-5"
        });

        $("div#contenedorgraf").append(divmultiple);
        var gneDatos = generaMultiple(c, columnaDos, vector);
        graficoMulti(grafmul, gneDatos[1], gneDatos[0], gneDatos[2]);
    } else {
        vector.map(x => {
            const grafbar = "grafico";
            const grafpie = "graficopie";
            var divbar = $("<div/>", {
                id: grafbar + x,
                class: "col-5"
            });

            var divpie = $("<div/>", {
                id: grafpie + x,
                class: "col-5"
            });

            $("div#contenedorgraf").append(divbar, divpie);
            var prueba = agrupaAcumula(c, columnaDos, x)
            var ba = separarObjeto(prueba);
            barrasAux(grafbar + x, ba[1], ba[0], x);
            var ca = devuelveObjpie(prueba)
            pieGrafAux(grafpie + x, ca, "inner", x);
        })
    }
}