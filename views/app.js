var express = require("express");
var app = express();
var mysql = require('mysql');
var fs = require("fs");
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var formidable = require('formidable');


app.use(express.static('public'));
var path = __dirname + '/views/';

var customers = [];

router.use(function (req,res,next) {
  next();
});

app.post('/api/cargarFoto', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    var archivo = req.body.file;
    console.log(archivo);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/public/images/FOTOS/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name); 
    });

    form.on('end', function (name, file){
       console.log(name, file);
       res.status(200).send(file.name);   
    })
   
  //  res.sendFile(__dirname + '/index.html');
});


/*
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'test'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('conectado a la Base de Datos')
})
*/

/*app.post('/cargarFoto', function(req, res) {
   var path = req.files.archivo.path;
   var newPath = './public/images/FOTOS/';

   var is = fs.createReadStream(path)
   var os = fs.createWriteStream(newPath)
     
    console.log('uno', is);
    console.log('uno', os) 
   is.pipe(os)

   console.log('dos', is);
    console.log('dos', os) 
   
  is.on('end' ,function() {
      //eliminamos el archivo temporal
     // fs.unlinkSync(path)
   })

   
  //console.log('aqui', file.archivo.name);
  res.status(200).send('OK');
});
*/

app.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.get("/api/listarJSON",function(req,res){
  
  fs.readdir("./public/json/",function(err, files){
   if (err) {
       return console.error(err);
   }
   return res.send(files);
  });
});

app.post("/api/customers/save", function(req,res){
	
	var customer = {};
	customer.firstname = req.body.firstname;
	customer.lastname = req.body.lastname;
	
	customers.push(customer);
	
	return res.send(customer);
});

app.post("/api/customers/all", function(req,res){
     var codigo = req.body.codigo;
     connection.query('SELECT * FROM personas WHERE CODIGO = ?', codigo, function(err, rows, fields) {
        return res.json(rows);
     });
});

app.post("/api/customers/test", function(req, res){
  var sampleObject = req.body.datos;
  var nombArch = req.body.nombre;
  var datos = { "personas" : sampleObject, "fecha": new Date() }

  fs.writeFile("./public/json/"+nombArch+".json", JSON.stringify(datos, null, 4), (err) => {
      if (err) throw err;
      return res.send("El Archivo se creo con exito");
  });
    
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(8081, function () {
  console.log('Aplicacion ejecutada por el puerto 8081!')
})


   
  
   