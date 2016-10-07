class CategoriesController < ApplicationController

  before_action :set_category, only: [:show, :edit, :update, :destroy]
  before_action :set_restriction

  def show
  end

  def new
    if $currentMenu.instance_of? Integer
      $currentMenu = $currentMenu
      @category = Menu.find($currentMenu).categories.new
    else
      @category = Category.new
    end
  end

  def edit
  end

  def create
    @category = Menu.find($currentMenu).categories.new(category_params)

    respond_to do |format|
      if @category.save
        format.html { redirect_to @category, notice: 'Category was successfully created.' }
        format.json { render :show, status: :created, location: @category }
      else
        format.html { render :new }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @category.update(category_params)
        format.html { redirect_to @category, notice: 'Category was successfully updated.' }
        format.json { render :show, status: :ok, location: @category }
      else
        format.html { render :edit }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @category.destroy
    respond_to do |format|
      format.html { redirect_to menu_path(Menu.find($currentMenu)), notice: 'Category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
      $currentCategory = @category.id
      @dishes = @category.dishes
      @drinks = @category.drinks
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def category_params
      params.require(:category).permit(:name, :menu_id)
    end

    #This method asks for a user session to see the full content
    def set_restriction
      @needOfficialSession = true
    end

end
