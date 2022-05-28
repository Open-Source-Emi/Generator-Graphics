function scroll() {
    $(".node").click(function() {
        $("#chart").scrollTop(0)
        $("#chart").scrollTop($(this).offset().top - 140);
    })
}

function generaExcel() {

    var tabla = $('table#jsonTable').get(0);
    var datosxls = tablaJson(tabla);
    var ws = XLSX.utils.json_to_sheet(datosxls);
    var wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
    XLSX.writeFile(wb, "personigrama.xlsx", { bookType: 'xlsx', bookSST: false, type: 'binary' });
}

function contarElementos(col) {
    var columna = [];
    $("#jsonTable").find("thead").find("th").map(function(i, v) {
        columna.push($(v).text());
    })

    var colbusq = columna.indexOf(col);
    var arr = {};
    $("#jsonTable").find("tbody").find("tr").each(function(i, val) {
        var txt = $(val).find("td").eq(colbusq).text();
        if (txt != "") {
            if (arr[txt]) arr[txt]++
                else arr[txt] = 1
        } else {
            var no = "No tiene"
            if (arr[no]) arr[no]++
                else arr[no] = 1
        }
    });

    matriz = Object.keys(arr).map(function(idx) {
        return { name: idx, value: arr[idx] };
    });

    return matriz;
};

function createTableDin(object, contenedor) {
    $('#' + contenedor).html("");
    $('#' + contenedor).append('<table id="tabla' + contenedor + '"><thead><tr></tr></thead><tbody></tbody></table>');

    $.each(Object.keys(object[0]), function(index, key) {
        $('#tabla' + contenedor + ' thead tr').append('<th>' + key + '</th>');
    });

    $.each(object, function(index, jsonObject) {
        if (Object.keys(jsonObject).length > 0) {
            var tableRow = '<tr>';
            $.each(Object.keys(jsonObject), function(i, key) {
                tableRow += (i == 0) ? '<td onclick="llamarDatos(this)" >' + jsonObject[key] + '</td>' : '<td>' + jsonObject[key] + '</td>';
            });
            tableRow += "</tr>";
            $('#tabla' + contenedor + ' tbody').append(tableRow);
        }
    });
}