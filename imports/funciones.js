var usuarios = [];
var modifica = false; //Variable para saber si se va a guardar o se va a modificar false guardar true modificar
var usrIdModifica = null;
var generaId = function(){
	var random = Math.floor((Math.random()*100)+1);
	var d = new Date();

	return random+"_"+d.getHours()+"_"+d.getSeconds();

};

var eliminar = function(userID){
	//Iteramos un arreglo
	$.each(usuarios,function(index,value){
		
		//Lo quitamos del arreglo y de la tabla
		if(value.id == userID){
			$("#tr"+value.id).remove();
			usuarios.splice(index,1);
			//Actualizamos en nuestro localStorage 
			localStorage.setItem("usuarios",JSON.stringify(usuarios));
			$("#btnForm").val("Agregar");
			modifica=false;
			usrIdModifica=null;
		}

	});
};

var editar = function(userID){
	$.each(usuarios,function(index,value){
		
		//Lo buscamos en el arreglo
		if(value.id == userID){
			// lo mostramos en los campos para modificarlo y cambiamos
			// el metodo del boton
			$("#nombre").val(value.nombre);
			$("#apellidos").val(value.apellidos);
			$("#edad").val(value.edad);
			$("#btnForm").val("Guardar");
			modifica=true;
			usrIdModifica = value.id;
		}

	});
}

var guardarEdicion =function(usuario){

}

var getUsuarios = function(){

	//Cargamos el arreglo desde localStorage
	//Revisar el limite en memoria permitido por navegador
	//https://www.w3schools.com/html/html5_webstorage.asp
	var usuariosCache = localStorage.getItem("usuarios");

	console.log(usuariosCache);

	if(usuariosCache != null){
		//Si existe revisamos el tamaño de usuarios y se los
		//asignamos a la variable arreglo usuarios
		usuarios = JSON.parse(usuariosCache);
		//iteramos y lo agregamos a la tabla;
		$.each(usuarios,function(index,value){
			muestraUsuarioTabla(value);
		});
	};

	return usuarios;

};

var agregarUsuario = function(usuario){
	//Lo agrega al arreglo
	if(modifica){
		//Buscamos obtenemos el index donde se encuentra el usuario
		$.each(usuarios,function(index,value){
			if(value.id==usrIdModifica){
				//actualizamos
				usuarios[index] = usuario;
				localStorage.setItem("usuarios",JSON.stringify(usuarios));
				//borramos y actualizamos la tabla
				$('[name="rowTabla"]').remove();
				getUsuarios();
				//Actualizamos valores
				$("#btnForm").val("Agregar");
				modifica=false;
				usrIdModifica=null;

			}
		});

	}else{
		usuarios.push(usuario);
		//Actualizamos en nuestro localStorage 
		localStorage.setItem("usuarios",JSON.stringify(usuarios));
		muestraUsuarioTabla(usuario);
	}
	

};


var muestraUsuarioTabla = function(usuario){
	//Lo muestra en la tabla
	var tbody="<tr id='tr"+usuario.id+"' name='rowTabla' >"+
				"<th>"+usuario.nombre+"</th>"+
				"<th>"+usuario.apellidos+"</th>"+
				"<th>"+usuario.edad+"</th>"+
				"<th><button class='eliminar' onClick='eliminar(\""+usuario.id+"\")'>Eliminar</button></th>"+
				"<th><button class='eliminar' onClick='editar(\""+usuario.id+"\")'>Editar</button></th>"+
			   "</tr>";


	$("#bodyTable").append(tbody);
};
