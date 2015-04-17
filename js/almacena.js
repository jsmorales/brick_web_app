$(function(){
	//---------------------------------------------------------------------------
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

		$("#form_webstore")[0].reset();

	}
	//------------------------------------------------------------
	function verItem(clave){
		res_item = sessionStorage.getItem(clave);

		$("#resultado").append(
			'<li class="list-group-item" data-c="'+clave+'"> Clave: '+clave+'-'+' Valor:'+res_item+' <button id="btn_quitar" data-c="'+clave+'" class="btn btn-danger">Quitar</button> </li>'
		);

		//se agrega la funcionalidad de cada boton de edicion
		$("[id*='btn_quitar']").click(function(){
			console.log("ha hecho clik");
			var clave_q = $(this).attr("data-c");
			quitaItem(clave_q);
			console.log(clave_q);
		});

	}

	//-------------------------------------------------------------
	function verTodo(){

		$("#resultado").html("");

		$.each(sessionStorage, function(index, val) {
			 /* iterate through array or object */
			 //console.log("el index es: "+index+" el valor es: "+val);

			//para esto tambien se puede utilizar sessionStorage.key(i);
			$("#resultado").append(
				'<li class="list-group-item"> Clave: '+index+'-'+' Valor:'+val+' <button id="btn_quitar" data-c="'+index+'" class="btn btn-danger">Quitar</button> </li>'
			);

		});
		//se agrega la funcionalidad de cada boton de edicion
		$("[id*='btn_quitar']").click(function(){
			console.log("ha hecho clik");
			var clave_q = $(this).attr("data-c");
			quitaItem(clave_q);
			console.log(clave_q);
		});

	}
	//---------------------------------------------------------------
	function quitaItem(clave){
		sessionStorage.removeItem(clave);
		verTodo();
	}
	//---------------------------------------------------------------
	$("#btn_guardar").click(function(){
		seteaItem();
	});

	verTodo();
	//---------------------------------------------------------------

});
