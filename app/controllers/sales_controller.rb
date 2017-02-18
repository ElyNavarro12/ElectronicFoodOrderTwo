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
      @food = Order.find(353).foods.create({
      :identifier => 1,
      :name => "Enchiladas",
      :quantity => 1,
      :price => 20,
      :total => 20})
    end

    @orders = Order.where(payed: false).all
    @order = @orders.first
  end

end
