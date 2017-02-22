class ClientsController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update, :destroy]


  def index
    @menu = Menu.all.where(isDefault: true).first
  end

  def show
  end

  def contacto
  end

  def menu
    @menu = Menu.all.where(isDefault: true).first
  end

  private
    def set_category
      @category = Category.find(params[:id])
    end

end
