let username = document.getElementById('titleContacto');
console.log(username.innerHTML)

username.innerText = "Usuario"
console.log(username.innerText)


let enviar = document.getElementById("enviar")
	enviar.addEventListener("submit", mensaje)
	function mensaje (e){
		e.preventDefault()
	let nombre = document.getElementById("nombre").value;
	let email = document.getElementById("email").value;
	let mostrar = document.getElementById("mensaje")

	mostrar.innerHTML = 

	`
	Gracias  ${nombre}, responderemos sus dudas a traves de ${email}

	`


	}

