class DishesController < ApplicationController

  before_action :set_dish, only: [:show, :edit, :update, :destroy]

  def show
  end

  def new
    @dish = Menu.find($currentid).dishes.new
  end

  def edit
  end

  def create
    @dish = Menu.find($currentid).dishes.new(dish_params)

    respond_to do |format|
      if @dish.save
        format.html { redirect_to @dish, notice: 'Dish was successfully created.' }
        format.json { render :show, status: :created, location: @dish }
      else
        format.html { render :new }
        format.json { render json: @dish.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @dish.update(dishes_params)
        format.html { redirect_to @dish, notice: 'Dish was successfully updated.' }
        format.json { render :show, status: :ok, location: @dish }
      else
        format.html { render :edit }
        format.json { render json: @dish.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @dish.destroy
    respond_to do |format|
      format.html { redirect_to dishes_url, notice: 'Dish was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dish
      @dish = Dish.find(params[:id])
      @dishes = @category.dishes
      @drinks = @category.drinks
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dish_params
      params.require(:dish).permit(:name, :menu_id)
    end
end
