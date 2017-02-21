class DrinksController < ApplicationController

  before_action :set_drink, only: [:show, :edit, :update, :destroy]
  before_action :set_categories, only: [:new, :edit, :destroy, :update]
  before_action :authenticate_user!

  def index
    @drinks = Drink.all
  end

  def show
  end

  def new
    @drink = Drink.new
  end

  def edit
  end

  def create
    @drink = Drink.new(drink_params)

    respond_to do |format|
      if @drink.save
        format.html { redirect_to @drink, notice: 'Drink was successfully created.' }
        format.json { render :show, status: :created, location: @drink }
      else
        format.html { render :new }
        format.json { render json: @drink.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @drink.update(drink_params)
        format.html { redirect_to @drink, notice: 'Drink was successfully updated.' }
        format.json { render :show, status: :ok, location: @drink }
      else
        format.html { render :edit }
        format.json { render json: @drink.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @drink.destroy
    respond_to do |format|
      format.html { redirect_to drinks_url, notice: 'Drink was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_drink
      @drink = Drink.find(params[:id])
    end

    def set_categories
      @categories = Array.new

      Category.all.each do |c|
        @categories.push(c.id)
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def drink_params
      params.require(:drink).permit(:name, :price, :description, :photo, :category_id)
    end

end
