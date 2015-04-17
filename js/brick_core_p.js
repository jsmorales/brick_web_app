$(function(){

  //variable para crear un ladrillo como una clase

  var ladrillo = {
    "alt_lad":"",
    "anch_lad":"",
    "crea_lad":function(){
      ladrillo.alt_lad = $("#alt_lad").val();
      ladrillo.anch_lad = $("#anch_lad").val();
      console.log(ladrillo.alt_lad+"-"+ladrillo.anch_lad);
      localStorage.setItem("alto",ladrillo.alt_lad);
      localStorage.setItem("ancho",ladrillo.anch_lad);
    }
  };

  $("#btn_crear_lad").click(function(){
    ladrillo.crea_lad();//si es una funcion se pone ()
    //console.log(ladrillo.prueba2);
  });

});
