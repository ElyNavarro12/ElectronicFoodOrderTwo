class OrdersController < ApplicationController

  before_action :authenticate_user!

  def index
    #Seleccionamos solo el menu que necesitamos
    @menu = Menu.where(isDefault: true).first
    @orders = Order.where(payed: false).all

    if @orders.length < 1
      @order = Order.new({
        :total => 0.0,
        :payed => false
      })
      @orders = Order.where(payed: false).all
    end
  end

end
