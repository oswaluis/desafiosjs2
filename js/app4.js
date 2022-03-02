let carritoDeCompras = []
const contenedorProductos = document.getElementById("contenedorProductos")
const seleccionTipo = document.getElementById("seleccionTipo")
const contadorCarrito = document.getElementById("contadorCarrito")
const carrito = document.getElementById("carritoContenedor")
const precioTotal = document.getElementById("precioTotal")
const buscador = document.getElementById("buscador")



seleccionTipo.addEventListener("change", ()=> {
		console.log(seleccionTipo.value)
	 	if (seleccionTipo.value == "all") {
	 		mostrarStock(stock)
	 	}else{
	 		console.log(stock.filter(el => el.tipo == seleccionTipo.value))
	 		mostrarStock(stock.filter(el => el.tipo == seleccionTipo.value))
	 	}}
	)


mostrarStock(stock)
	
	function mostrarStock(array){
		contenedorProductos.innerHTML="";
		for( const producto of array){
		let div = document.createElement("div")
			div.className = "producto"
			div.innerHTML += `
			    		<div class=" card border-ligth me-3 mb-3 text-center h-100"  >
     						 <img src="${producto.img}" class="card-img-top h-75" alt="...">
						     <div class="card-body">
						     <h5 class="card-title">${producto.nombre}</h5>
						     <p class="card-text fs-5">${producto.tipo}</p>
						      <p class="card-text fs-6">Talle: ${producto.talle}</p>
						     <a id="botonCarr${producto.id}" class="btn btn-primary">$${producto.precio}</a>
						     </div>  
						</div>
						  
			`
			contenedorProductos.appendChild(div)	

			let btnCarrito = document.getElementById(`botonCarr${producto.id}`)
			// console.log(btnCarrito)
			btnCarrito.addEventListener("click",()=>{
			agregarCarrito(producto.id)
			Toastify({
				  text: "Producto Agregado",
				  className: "info",
				  style: {
				    background: "#153959",
				  }
				}).showToast();
			})
		}
	}


function agregarCarrito(id){
	let repeat = carritoDeCompras.find(item => item.id == id)
	if(repeat){
		console.log(repeat)
		repeat.cantidad ++
		
		document.getElementById(`cantidad${repeat.id}`).innerHTML = `<p id= cantidad${repeat.id}> Cantidad: ${repeat.cantidad}</p>`
		actCarrito()
	}else{

		let productoAgg = stock.find(elemento => elemento.id == id)
		console.log(productoAgg)
		carritoDeCompras.push(productoAgg)
		actCarrito()
		let div = document.createElement('div')
		div.className = "productosCarrito"
		div.innerHTML = `  
						
				        	<p>Nombre: ${productoAgg.nombre}</p>
				        	<p>Precio: $${productoAgg.precio}</p>
				        	<p id= cantidad${productoAgg.id}> Cantidad: ${productoAgg.cantidad}</p>
				        	<button id=btnEliminar${productoAgg.id} class="boton-eliminar"><i class="fas fa-trash"></i></button>
				        	
				    `				
		carrito.appendChild(div)

		let btnEliminar =document.getElementById(`btnEliminar${productoAgg.id}`)

		btnEliminar.addEventListener("click" , ()=>{
			if (productoAgg.cantidad == 1){
				btnEliminar.parentElement.remove()
				carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgg.id)
				actCarrito()
				localStorage.setItem("carro", JSON.stringify(carritoDeCompras))
							Toastify({
							  text: "Producto eliminado",
							  className: "info",
							  style: {
							    background: "#8c0327",
							  }
							}).showToast();
			}else{
				productoAgg.cantidad --
				document.getElementById(`cantidad${productoAgg.id}`).innerHTML = `<p id= cantidad${productoAgg.id}> Cantidad: ${productoAgg.cantidad}</p>`
				actCarrito()
				localStorage.setItem("carro", JSON.stringify(carritoDeCompras))
							Toastify({
								  text: "Item eliminado",
								  className: "info",
								  style: {
								    background: "#8c0327",
								  }
								}).showToast();
			}
			
		})
	}

	localStorage.setItem("carro", JSON.stringify(carritoDeCompras))

	
}

function actCarrito(){
	contadorCarrito.innerText = carritoDeCompras.reduce((acc, el)=> acc + el.cantidad, 0)
	precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad),0)
}


function recuperar(){
	let recuperarLS = JSON.parse(localStorage.getItem("carro"))
	if(recuperarLS){
		recuperarLS.forEach(element => {
			agregarCarrito(element.id)

		});
	}
}

recuperar()

let mensaje = document.getElementById("mensajeCompra")

let btnComprar = document.getElementById("btnComprar")
btnComprar.addEventListener("click",()=>{
	console.log("Felicitaciones ud ha comprado")
	localStorage.clear()
	btnComprar.remove()
	mensajeCompra.innerHTML=""
	let div = document.createElement("div")
	div.className = "message"
	div.innerHTML = `Felicitaciones su compra llegara lo antes posible
	`
	mensaje.appendChild(div)

})