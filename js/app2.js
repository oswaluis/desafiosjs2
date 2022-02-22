let nombre = prompt("¿Como te llamas?")
alert("Bievenido " + nombre + " tenemos productos nuevos para ti");
console.log("Cliente = " + nombre)

let Productos =[
	{id:1 , nombre:"remera colores" , tipo: "remera" , precio: 1100},
	{id:2, nombre:"remera seleccion", tipo: "remera" , precio: 1100},
	{id:3, nombre:"remera negra", tipo: "remera" ,  precio: 1100},
	{id:4, nombre:"remera flores", tipo: "remera" ,  precio: 1100},
	{id:5, nombre:"pantalon negro", tipo: "pantalon" ,  precio: 2000},
	{id:6, nombre:"pantalon azul", tipo: "pantalon" ,  precio: 2000},
	{id:7, nombre:"pantalon verde", tipo: "pantalon" , precio: 2000},
	{id:8, nombre:"short negro", tipo: "short" ,  precio: 800},
	{id:9, nombre:"short verde", tipo: "short" ,  precio: 800},
	{id:10, nombre:"short seleccion", tipo: "short" ,  precio: 800},
	{id:11, nombre:"medias largas", tipo: "medias" ,  precio: 500},
	{id:12, nombre:"medias cortas", tipo: "medias" ,  precio: 500},
]
let mostrarProductos = Productos.map((pro)=> pro.nombre)
alert(mostrarProductos.join ("\n"))


let carrito = []

agregar()

function agregar() {
	let  userQuiere = prompt ("¿Cual producto quiere?").toLowerCase()
	let cantidadUser = parseInt(prompt("¿cuantos?"))

	let agregar = Productos.find((cual) => cual.nombre == userQuiere)


	agregar.cantidad = cantidadUser
	carrito.push(agregar)
	console.log(carrito)
carritoNew()
	
}




otro()
function otro()
{let otroProducto = prompt (nombre +" ¿Desea agregar otro producto?").toLowerCase()
		if (otroProducto == "si") {
			agregar()
			otro()
		} else {
		alert("muchas gracias " + nombre)
	}
}
	

function carritoNew(){
	console.log("cantidad de productos agregados " + carrito.length)
	 suma = carrito.reduce((acc, cual)=> acc + (cual.precio * cual.cantidad), 0)

	console.log("El total de su carrito es de $" + suma)
	return suma
}

console.log (suma)
let total = suma

let descuento = prompt("Eres miembro de nuestra tienda?").toLowerCase();

function descuentoCal(){
	totalDef = total - (total * 0.25)
}


if(descuento == "si"){
	alert("Genial, tienes un 25% de descuento")
	descuentoCal()
	alert("Su total es de $" + totalDef)
	console.log("Total es de $" + totalDef)
}else{
	alert("Lo invitamos a inscribirse como socio")
	alert("Gracias por su compra, su total es de $" + total)
	console.log("Total es de $" + total)
}

