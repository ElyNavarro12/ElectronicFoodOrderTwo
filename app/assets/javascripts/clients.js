$(document).ready(function () {

	$("#responsive-icon").on("click",function(){
		$("#responsive-nav ul").toggleClass("active")
		$(this).toggleClass("glyphicon-menu-hamburger")
	})
	//Se llama la funcion para cada descripcion de platillo
	//se llama la funcion para la orden del platillo
	toggleOrder()
});
//Funcion para cada descripcion del platillo
function toggleFood(id) {

	$("#plate_"+id).on("click",function(){
		$("#id_"+id).animate({
			top: "11%"
		}, "slow")
		//$("#id_0").toggleClass("hidden")
	})
	$("#close_"+id).on("click",function(event){
		$("#id_"+id).animate({
			top: "100%"
		}, "slow")
		//$("#id_0").toggleClass("hidden")
	})
}
function toggleOrder() {
	//funcion para abrir la ventana de la orden
	$("#order").on("click",function(){
		$("#order_page").animate({
			top: "11%"
		}, "slow")
	})
	//funcion para cerrar la ventana de la order
	$("#close").on("click",function(){
		$("#order_page").animate({
			top: "100%"
		}, "slow")
	})
}
