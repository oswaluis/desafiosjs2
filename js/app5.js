let carritoDeCompras = []
let stock = []
const contenedorProductos = document.getElementById("contenedorProductos")
const seleccionTipo = document.getElementById("seleccionTipo")
const contadorCarrito = document.getElementById("contadorCarrito")
const carrito = document.getElementById("carritoContenedor")
const precioTotal = document.getElementById("precioTotal")
const btnCerrar = document.getElementById("btnCerrar")
const contenedorModal = document.getElementById("contenedorModal")




seleccionTipo.addEventListener("change", ()=> {
		console.log(seleccionTipo.value)
	 	if (seleccionTipo.value == "all") {
	 		mostrarStock(stock)
	 	}else{
	 		console.log(stock.filter(el => el.tipo == seleccionTipo.value))
	 		mostrarStock(stock.filter(el => el.tipo == seleccionTipo.value))
	 	}}
	)

fetch('productos.json')	
	.then(Response => Response.json())
	.then(data => {mostrarStock(data)
		data.forEach(el=>stock.push(el))})
	.catch(error => console.log(error))

	
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


function agregarCarrito(cod){
	let repeat = carritoDeCompras.find(item => item.id == cod)
	if(repeat){
		const {id, cantidad} = repeat
		
		repeat.cantidad +=1
		console.log(repeat)
		document.getElementById(`cantidad${id}`).innerHTML = `<p id= cantidad${id}> Cantidad: ${repeat.cantidad}</p>`
		actCarrito()
	}else{

		let productoAgg = stock.find(elemento => elemento.id == cod)
		console.log(productoAgg)
		carritoDeCompras =  [...carritoDeCompras, productoAgg]
		
		actCarrito()
		mostrarCarrito(productoAgg)
		
	}

	localStorage.setItem("carro", JSON.stringify(carritoDeCompras))

	
}

function mostrarCarrito(productoAgg){
	const { nombre, precio, cantidad, id } = productoAgg
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
				Toastify({
						text: "Producto eliminado",
						className: "info",
						style: {
							background: "#8c0327",
							 }
						}).showToast();
			}else{
				const {cantidad, id } = productoAgg
				productoAgg.cantidad -=1
				document.getElementById(`cantidad${id}`).innerHTML = `<p id= cantidad${id}> Cantidad: ${productoAgg.cantidad}</p>`
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

function actCarrito(){
	contadorCarrito.innerText = carritoDeCompras.reduce((acc, el)=> acc + el.cantidad, 0)
	precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad),0)
}


function recuperar(){
	let recuperarLS = JSON.parse(localStorage.getItem("carro"))
	recuperarLS &&
		recuperarLS.forEach(element => {
			mostrarCarrito(element)
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
	

		Swal.fire({
		  title: 'Felicitaciones',
		  text: 'Tu compra se ha realizado con exito',
		  imageUrl: './img/logoMora.png',
		  imageWidth: 400,
		  imageHeight: 200,
		  imageAlt: 'Custom image',
		})
})