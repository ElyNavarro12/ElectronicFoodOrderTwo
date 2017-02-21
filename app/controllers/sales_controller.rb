class SalesController < ApplicationController
  before_action :authenticate_user!

  def index
    @menu = Menu.where(isDefault: true).first

    #@orders = Order.where(payed: false).all.destroy_all

    if @orders = Order.where(payed: false).all.length < 1
      @order = Order.create({
        :total => 0.0,
        :payed => false
      })
    end

    @orders = Order.where(payed: false).all
    @order = @orders.first
  end

end
