class Dish < ActiveRecord::Base

  belongs_to :category

  has_many :ingridients

end
