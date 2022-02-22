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
			const {img, precio, nombre, tipo, talle, cantidad, id:cod} = producto 
		let div = document.createElement("div")
			div.className = "producto"
			div.innerHTML += `
			    		<div class=" card border-ligth me-3 mb-3 text-center h-100"  >
     						 <img src="${img}" class="card-img-top h-75" alt="...">
						     <div class="card-body">
						     <h5 class="card-title">${nombre}</h5>
						     <p class="card-text fs-5">${tipo}</p>
						      <p class="card-text fs-6">Talle: ${talle}</p>
						     <a id="botonCarr${cod}" class="btn btn-primary">$${precio}</a>
						     </div>  
						</div>
						  
			`
			contenedorProductos.appendChild(div)	

			let btnCarrito = document.getElementById(`botonCarr${cod}`)
			// console.log(btnCarrito)
			btnCarrito.addEventListener("click",()=>{
			agregarCarrito(producto)
			})
		}
	}


function agregarCarrito(id){
	let repeat = carritoDeCompras.find(item => item.id == id)
	if(repeat){
		const {id, cantidad} = repeat
		console.log(repeat)
		repeat.cantidad ++
		document.getElementById(`cantidad${id}`).innerHTML = `<p id= cantidad${id}> Cantidad: ${cantidad}</p>`
		actCarrito()
	}else{

		let productoAgg = stock.find(elemento => elemento.id == id)
		console.log(productoAgg)
		carritoDeCompras =  [...carritoDeCompras, productoAgg]
		const { nombre, precio, cantidad, id } = productoAgg
		actCarrito()
		let div = document.createElement('div')
		div.className = "productosCarrito"
		div.innerHTML = `  
						
				        	<p>Nombre: ${nombre}</p>
				        	<p>Precio: $${precio}</p>
				        	<p id= cantidad${id}> Cantidad: ${cantidad}</p>
				        	<button id=btnEliminar${id} class="boton-eliminar"><i class="fas fa-trash"></i></button>
				        	
				    `				
		carrito.appendChild(div)

		let btnEliminar =document.getElementById(`btnEliminar${id}`)

		btnEliminar.addEventListener("click" , ()=>{
			if (productoAgg.cantidad == 1){
				btnEliminar.parentElement.remove()
				carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgg.id)
				actCarrito()
				localStorage.setItem("carro", JSON.stringify(carritoDeCompras))
			}else{
				const {cantidad, id } = productoAgg
				productoAgg.cantidad --
				document.getElementById(`cantidad${id}`).innerHTML = `<p id= cantidad${id}> Cantidad: ${cantidad}</p>`
				actCarrito()
				localStorage.setItem("carro", JSON.stringify(carritoDeCompras))
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
	recuperarLS &&
		recuperarLS.forEach(element => {
			agregarCarrito(element.id)
			carritoDeCompras.push(element)
			actCarrito()

		});
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