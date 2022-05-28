$( document ).ready(function() {
  
    function listararchivosJson(){ 
      $("ul.content_json").html("");
	  $.ajax({
			type : "GET",
			url : window.location + "api/listarJSON",
			success: function(org){
				crearListJSON(org)
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});	
	}

	listararchivosJson();

	$("#allCustomers").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
	
	function ajaxGet(){
        var codigo = $("#buscarBD").val();
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "api/customers/all",
			data : JSON.stringify({ codigo: codigo }),
			dataType : 'json',
			success: function(org){
				createTable(org);
                crearPanel(org);
                crearConfiguracion(org);
                crearEstadis(org);
                $("#archivoabr").text("Base de datos - Codigo: " + codigo);
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}
    
   $("#boton1").click(function () {
       crearJson();
   });
   
   function crearJson(nombre){
       $("#fancy_cargando").show();
       $("#fancy_cargando").find("h3.title_lb").text("Creando Archivo ...");

       var tabla = $('table#jsonTable').get(0);
       var datosjson = tablaJson(tabla);

   	   $.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "api/customers/test",
			data : JSON.stringify({ datos: datosjson, nombre: nombre }),
			dataType : 'json',
			complete : function(org){
				setTimeout(function(){ $("#fancy_cargando").hide(); }, 1500);
				$("input#nomJson").val("");
			}
		});	
   }

   function crearListJSON(archivos) {
   	     var listar = "";
   	     archivos.map( function( i, v ) { 
   	     	listar += '<li><span id="archivoJSON" onclick="cargarJson(this)">'+ i +'</span></li>';
   	     });

    	 $(".content_json").append(listar); 
   }
   
   $("#crearArchJson").click(function(){
   	  var nombre = $("#nomJson").val();
   	  crearJson(nombre);
   	  listararchivosJson();
   });

   $("#fileUploadForm").submit(function(event) {
      event.preventDefault();
      var fd = new FormData();    
      fd.append( 'file', $( '#file' )[0].files[0]  );
  
      $.ajax({
      url: window.location + "api/cargarFoto",
      type: "POST",
      dataType: "html",
      data: fd,
      cache: false,
      contentType: false,
      processData: false
    }).done(function (res) {
      console.log(res);
      $("#mensaje").html("Respuesta: " + res);
    });
   });
})