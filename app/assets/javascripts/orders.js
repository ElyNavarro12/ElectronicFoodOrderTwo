// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

/*
* En este archivo se lleva acabo todo el funcionamiento del punto de ventas, las variables generadas en el controlador son solo para no perder
* datos cundo se abandone la pagina y se vuelva a acceder a ella.
* En este archivo se encuentran los procesos logicos para el movimiento entre el menu, la creacion y destruccion de las ordenes, las opciones para
* agregar comida a las ordenes, editar cantidades, precios, descuentos de las comidas agregadas en la orden; y la opcion de pagar una orden.
*/

$(window).ready(function(){

  moveThroughMenu();
  createOrder();
  deleteOrder();
  selectOrder();
  addToOrder();
  removeFromOrder();

});

// Logica para moverse por el menu //
function moveThroughMenu(){

  fastGet('/menus', function(menus, mst){
    //Iteramos los menus
    menus.forEach(function(item, index){
      //Identificamos si es el menu por defecto
      if (item.isDefault){
        //Al iterar las categorias creamos un boton para acceder a cada uno
        item.categories.forEach(function(i, ix){
          if (i.menu_id == item.id){
            $(document).on('click', '#category_'+i.id, function(event){

              $('.categories-backend').fadeOut(50);
              $('#category_id_'+i.id).fadeIn();

              //Agregamos el nombre de la categoria a la que se ingresa en nuestro 'tracker'
              $('#branch').append('<li id="newBranch">'+i.name+'</li>')

              //Damos la opcion al usuario de volve atras al hacer click en cualquier categoria en el siguimiento del tracker
              $(document).on('click', '#track', function(event){
                $('.foods-backend').fadeOut(50);
                $('.categories-backend').fadeIn();
                $('#newBranch').remove();
              });

            });//on click
          }//if
        });//forEach
      }//if
    });//forEch
  });//fastGetMenus

}

//Creacion de nuevas ordenes
function createOrder(){
  //Calculamos la orden actual
  currentOrder = $('.currentOrder-backend .id-backend').text();

  $('#add').click(function(){
    //Creamos una nueva orden en nuestra base de datos
    fastPost('/orders',{order: {payed: false, total: 0.0}}, function(){});

    //Actualizamos la vista de nuestras ordenes
    $('.time-backend').remove();
    $('.currentOrder-backend').removeClass('currentOrder-backend');

    setTimeout(function(){
      //Actualizamos nuestra variable de ordenes
      fastGet('/orders', function(data, status){
        //Mostramos la nueva orden en pantalla y la marcamos como seleccionada
        last = data.length - 1;
        $('.orderSelection-backend').append(
          '<div class="selectOrder-backend baseBox-backend currentOrder-backend" id="order_'+data[last].id+'">'
            +'<p class="id-backend">'+ data[last].id +'</p><p class="time-backend">'+ data[last].created_at.slice(11, 16) +'</p>'
          +'</div>'
        );
        //Cremos un campo en blanco donde iran las ordenes;
        $('.added').append(
          '<div class="not-empty in_'+data[last].id+'-backend">'
          +'</div>'
        );
        $('.not-empty-backend').addClass('hidden-backend');
        $('.empty-backend').removeClass('hidden-backend');
      });//fastGet
    },50);//setTimeout

  });//click
}//createOrder

//Logica para eliminar ordenes
function deleteOrder(){
  $(document).on("click", '#delete', function(event){
    //Calculamos currentOrder
    currentOrder = $('.currentOrder-backend .id-backend').text();

    //Removemos la informacion de la orden actual que se esta mostrando
    $('.time-backend').remove();
    $('.currentOrder-backend').removeClass('currentOrder-backend');
    $('#order_'+currentOrder).remove();
    $('.in_'+currentOrder+'-backend').remove();

    //Eliminamos las comidas dentro de la orden actualmente seleccionada TODO Arreglar esta pinshi parte que no se porque no sirve :c
    fastGet('/foods', function(data, status){
      findid = $('.currentOrder-backend .id-backend').text();
      data.forEach(function(item, index){
        if (item.order_id == currentOrder) {
          fastDestroy('/foods', item.id, function(){});
        }
      });
    });

    //Eliminamos la orden que actualmente esta seleccionada
    fastDestroy('/orders', currentOrder, function(){});

    //Actualizamos la vista de la orden actual
    fastGet('/orders', function(data, status){

      $('#order_'+ data[0].id).addClass('currentOrder-backend');
      $('.currentOrder-backend').append('<p class="time-backend">'+ data[0].created_at.slice(11, 16) +'</p>');

      //Actualizamos la info de los alimentos dentro de la orden
      fastGet('/foods', function(f, s){
        isEmpty = true;
        f.forEach(function(i, ix){
          if (i.order_id == data[0].id) {
            isEmpty = false;
          }
        });
        if (isEmpty) {
          $('.not-empty-backend').addClass('hidden-backend');
          $('.empty-backend').removeClass('hidden-backend');
        } else {
          $('.not-empty-backend').addClass('hidden-backend');
          $('.empty-backend').addClass('hidden-backend');
          $('.in_'+data[0].id+'-backend').removeClass('hidden-backend');
        }
      });

    });
    //Reecalculamos la id actual
    currentOrder = $('.currentOrder-backend .id-backend').text();
  });
}

//Logica para seleccionar orden
function selectOrder(){

  //Marcamos como seleccionado la orden clickeada
  $(document).on("click", '.selectOrder-backend',function(event){
    clickedId = event.currentTarget.id;

    if (clickedId.slice(0,5) == 'order') {

      //removemos la clase seleccionada
      $('.time-backend').remove();
      $('.currentOrder-backend').removeClass('currentOrder-backend');

      fastGet('/orders', function(data, status){

        data.forEach(function(item, index){
          if (item.id == clickedId.slice(6)) {
            $('#'+clickedId).append('<p class="time-backend">'+ data[index].created_at.slice(11, 16) +'</p>');
            $('#'+clickedId).addClass('currentOrder-backend');

            //Actualizamos la info de los alimentos dentro de la orden
            fastGet('/foods', function(f, s){
              isEmpty = true;
              f.forEach(function(i, ix){
                if (i.order_id == data[index].id) {
                  isEmpty = false;
                }
              });
              if (isEmpty) {
                $('.not-empty-backend').addClass('hidden-backend');
                $('.empty-backend').removeClass('hidden-backend');
              } else {
                $('.not-empty-backend').addClass('hidden-backend');
                $('.empty-backend').addClass('hidden-backend');
                $('.in_'+data[index].id+'-backend').removeClass('hidden-backend');
              }
            });

          }//ifIdIsSameAsClicked
        });//eachFunction

      });//fastGetOrders

    }//ifClickedId
  });//click function


  //Calculamos la orden actual
  currentOrder = $('.currentOrder-backend .id-backend').text();

}

//Logica para agregr comida a las ordenes
function addToOrder(){

  //Creamos un eventListener para cualquier tipo de comida
  $(document).on("click", '.food-backend', function(event){
    //Informacion requerida del evento
    updated = false;
    foodType = event.currentTarget.id.slice(0, event.currentTarget.id.indexOf("_"));
    foodId = event.currentTarget.id.slice(event.currentTarget.id.indexOf("_")+1);
    currentOrder = $('.currentOrder-backend .id-backend').text();
    foodUrl = '';
    if(foodType == 'dish'){
      foodUrl = '/dishes';
    }else if (foodType == 'drink') {
      foodUrl = '/drinks';
    }
    $('.empty-backend').addClass('hidden-backend');
    $('.in_'+currentOrder+'-backend').removeClass('hidden-backend');

    //Buscamos
    fastGet(foodUrl+'/'+foodId, function(data, status){
      //Tomamos la tabla foods
      fastGet('/foods', function(d, s){
        //Iteramos los datos
        d.forEach(function(item, index){
          //Si se encuentra una comida exactamente igual a la que se esta intentando guardar evitamos que se cree de nuevo y aumentomos la cantidad
          if (item.order_id == currentOrder && item.identifier == foodId && item.iof == foodType) {
            fastGet('foods/'+item.id, function(f, fs){
              newQuantity = f.quantity + 1;
              newTotal = f.price*(newQuantity);
              fastUpdate('/foods/'+item.id, {food: {quantity: newQuantity, total: newTotal}}, function(){});
            });//fastGet
            updated = true;
          }//if
        });//forEach

        //Si no se actualizo creamos uno nuevo
        if (updated == false) {
          fastPost('/foods', {food: {identifier: foodId, iof: foodType, name: data.name, quantity: 1, price: data.price, total: data.price*1, order_id: currentOrder}}, function(){});
        }//if
      });//fastGetFoods
    });//fastGet

    //Actualizamos el total de la ordenes
    setTimeout(function(){
      fastGet('/foods', function(data, status){
        var orderTotal = +0;
        data.forEach(function(item, index){
          if (item.order_id == currentOrder) {
            orderTotal += +item.total;
          }
        });//forEachFoods
        fastUpdate('/orders/'+currentOrder, {order: {payed: false, total: orderTotal}}, function(){});
      });//fastGetFoods

    },300);

    //Actualizamos ordenes pero con un retraso de 0.4 segundos para dar tiempo a que se guarden las ordenes
    setTimeout(function(){

      //Actualizamos informacion del platillo/bebida
      fastGet('/foods', function(data, status){
        data.forEach(function(item, index){
          if (item.order_id == currentOrder && item.identifier == foodId && item.iof == foodType) {
            if (updated) {
              $('#food_'+item.id+' .head-backend h4-backend').text('Total: '+item.total);
              $('#food_'+item.id+' .info-backend .price-backend').text('Precio: '+item.price);
              $('#food_'+item.id+' .info-backend .qty-backend').text(item.quantity+' Pedido(s)');
            } else {
              $('.in_'+currentOrder).append(
                '<div class="food-in-order-backend" id="food_'+item.id+'">'
                  +'<div class="head-backend baseBox-backend">'
                    +'<h3>'+item.name+'</h3>'
                    +'<h4>Total: '+item.total+'</h4>'
                  +'</div>'
                  +'<div class="info-backend baseBox-backend">'
                    +'<p class="price-backend">Precio: '+item.price+'</p>'
                    +'<p class="qty-backend">'+item.quantity+' Pedido(s)</p>'
                    +'<p class="remove-food-backend" id="remove-food-'+item.id+'">x</p>'
                  +'</div>'
                +'</div>'
              );
            }//ifUpdated
          }//ifBlaBla
        })//forEach
      });//fastGet

      //Actualizamos total
      fastGet('/orders', function(data, status){
        setTimeout(function(){
          data.forEach(function(item, idnex){
            if (item.id == currentOrder) {
              $('.in_'+currentOrder+'-backend .total-backend').remove();
              $('.in_'+currentOrder).append(
                '<div class="total-backend">'
                  +'<h5>Total: '+item.total+'</h5>'
                +'</div>'
              );
            }
          }, 100);
        });
      });//fastGetOrders

    },400);

  });//clickFunction

}

//Logica para remover comida de las ordenes
function removeFromOrder(){

  //Iniciamos un listener de click
  $(document).on('click', '.remove-food-backend', function(event){
    //Informacion necesaria obtenida del evento
    foodId = event.currentTarget.id.slice(12);

    //Eliminamos la instancia de Food seleccionada
    fastDestroy('/foods', foodId, function(){});
    $('#food_'+foodId).remove();

    //Actualizamos el total
    fastGet('/foods', function(data, status){
      var orderTotal = +0;
      data.forEach(function(item, index){
        if (item.order_id == currentOrder) {
          orderTotal += +item.total;
        }
      });//forEachFoods
      fastUpdate('/orders/'+currentOrder, {order: {payed: false, total: orderTotal}}, function(){});
    });//fastGetFoods

    //Actualizamos total graficamente con un retraso de 0.5 segundos para dar tiempo a la base de datos
    setTimeout(function(){
      fastGet('/orders', function(data, status){
        data.forEach(function(item, idnex){
          if (item.id == currentOrder) {
            $('.in_'+currentOrder+'-backend .total-backend h5').text('Total: '+item.total);
            if (item.total == 0){
              $('.not-empty-backend').addClass('hidden-backend');
              $('.empty-backend').removeClass('hidden-backend');
            }
          }//if
        });//foreach

      });//fastGetOrders
    },300);

  });//clickEvent

}

/* * * * * * * * * * * * * * * * * * * * * *
*           Helping Methods                *
* * * * * * * * * * * * * * * * * * * * * */

function fastGet(url, customFunction){
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: customFunction
  });//AjaxGetMethod
}

function fastPost(url, json, customFunction){
  $.ajax({
    type: 'POST',
    url: url,
    dataType: 'json',
    data: $.param(json),
    success: customFunction
  });//AjaxPostMethod
}

function fastDestroy(url, jsonId, customFunction){
  $.ajax({
    type: 'POST',
    url: url+'/'+jsonId,
    dataType: 'json',
    data: {'_method':'delete'},
    success: customFunction
  });//AjaxDestroyMethod
}

function fastUpdate(url, json, customFunction){
  $.ajax({
    type: 'PUT',
    url: url,
    dataType: 'json',
    data: $.param(json),
    success: customFunction
  });//AjaxPostMethod
}
