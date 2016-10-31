class OrdersController < ApplicationController

  def index
    #Seleccionamos solo el menu que necesitamos
    @menu = Menu.find(1)
    @orders = Order.all
  end

end
