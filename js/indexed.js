$(function(){

  //console.log("indexed listo");
  var nombre_r,numero_r=null;
  var base = null;
  //------------------------------------------------------------------------
  //Funciones
  //------------------------------------------------------------------------
  function tomaVal(){
    nombre_r = $("#nombre").val();
    numero_r = $("#numero").val();
  }
  //------------------------------------------------------------------------
  function iniciar (){
    //funcion para iniciar la base de datos indexedDB

    //iniciamos con indexedDB.open que tiene como parametro
    //el nombre de la BD, esto la abre si ya existe, si no
    //la crea.

    solicitud = indexedDB.open("agenda1");

    //para hacer referencia a la base creada se guarda en una
    //variable de la siguiente manera:

    solicitud.onsuccess = function(e){
      base = e.target.result;
      /*almacena el resultado del open dentro de la variable base,
      quedando alli la base de datos.*/
      //console.log(base);
      //insertar();
    }

    //ya creada la BD ahora se crea la "tabla" o almacen de datos:
    //se utiliza createObjectStore que lleva como parametros el nombre
    //del almacen de datos y el campo clave

    solicitud.onupgradeneeded = function(e){
      base = e.target.result;
      base.createObjectStore("contactos",{keyPath:"nombre"});
    }

  }
  //------------------------------------------------------------------------
  function insertar(){
    //se inicia la bd


    //toma los valores de los campos
    tomaVal();

    //se agrega al almacen da datos contactos lo valores
    //para ello hay que crear una transaccion que me permitira
    //insertar, consultar o actualizar del almacen de datos
    //para transaction los parametros son el almacen de datos
    //y el tipo de transaccion

    var transaccion = base.transaction(["contactos"],"readwrite");//se indica que la accion es de insercion

    //ahora se le indica que se va a guardar alli:
    var almacenar = transaccion.objectStore("contactos");

    var insertar = almacenar.add({nombre:nombre_r,numero:numero_r});

    mostrar();

    $("#form_indexed")[0].reset();
  }
  //------------------------------------------------------------------------
  function mostrar(){

    var transaccion = base.transaction(["contactos"],"readonly");
    var almacenar = transaccion.objectStore("contactos");

    //en esta parte se crea un cursor
    var muestra = almacenar.openCursor();

    muestra.onsuccess = function(e){
      var cursor = e.target.result;

      console.log(cursor.value);
      cursor.continue();

      $("#resultado").append(
          '<li class="list-group-item"> Nombre: '+cursor.value.nombre+'-'+' Número:'+cursor.value.numero+'</li>'
        );

    }

  }
  //------------------------------------------------------------------------

  //------------------------------------------------------------------------
  //muestra los resultados al iniciar
  function startDataIn(){
    iniciar ();

    solicitud.onsuccess = function(e){
      base = e.target.result;
      $("#resultado").html("");
      mostrar();
    };

  }

  startDataIn();
  //------------------------------------------------------------------------

  $("#btn_guardar").click(function(){

    iniciar();

    solicitud.onsuccess = function(e){
      base = e.target.result;
      /*almacena el resultado del open dentro de la variable base,
      quedando alli la base de datos.*/
      console.log(base);

      $("#resultado").html("");

      insertar();
    }

  });

});
