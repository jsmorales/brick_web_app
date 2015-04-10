$(function(){
	console.log("prueba");


	//variables de los valores
	var clave,valor = null;
	var res_item = null;
	//tomo los valores del form
	function seteaItem(){

		clave = $("#clave").val();
		valor = $("#valor").val();

		console.log("La clave es: "+clave+" y el valor es: "+valor);

		//sessionStorage
		//creacion del item
		sessionStorage.setItem(clave,valor);

		verItem(clave); 

	}

	function verItem(clave){
		res_item = sessionStorage.getItem(clave);

		$("#resultado").append(
			'<li class="list-group-item"> Clave: '+clave+'-'+' Valor:'+res_item+'</li>'
		);
	}

	//---------------------------------------------------------------
	$("#btn_guardar").click(function(){
		seteaItem();
	});
	//---------------------------------------------------------------

});